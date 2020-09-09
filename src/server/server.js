require('dotenv').config(); 
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connect-db';
import './initialize-db';
import { authenticationRoute } from './authenticate';
import { createCustomer } from '../app/store/mutations';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

//Mailgun
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

//For the temporary method of getting the latest review data
const puppeteer = require('puppeteer');

let port = process.env.PORT || 7777;
let app = express();

app.listen(port, console.log("Server is listening on port ", port));

//Allow us to use like a post request
app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
    app.use(express.static(path.resolve(__dirname,'../../dist')));
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve('index.html'));
    });
}

export const addNewTask = async task => {
    let db = await connectDB();
    let collection = db.collection('tasks');
    await collection.insertOne(task);
}

export const updateTask = async task => {
    let { id, group, isComplete, name } = task;
    let db = await connectDB();
    let collection = db.collection('tasks');

    if (group) {
        await collection.updateOne({id}, {$set: {group}});
    }

    if (name) {
        await collection.updateOne({id}, {$set: {name}});
    }

    if (isComplete !== undefined) {
        await collection.updateOne({id}, {$set: {isComplete}});
    }
} 

export const addNewComment = async comment => {
    let db = await connectDB();
    let collection = db.collection('comments');
    await collection.insertOne(comment);
}

export const sendEmail = async email => {
    //Production
    if (process.env.NODE_ENV === `production`) {
        //Look at this for the production method
        //https://devcenter.heroku.com/articles/mailgun

    }
    //Development Mode
    else {
        //Code referenced from: https://www.youtube.com/watch?v=JpcLd5UrDOQ

        //Add the send email to the database to keep a record
        let db = await connectDB();
        let collection = db.collection('emails');
        await collection.insertOne(email);
        //Now actually send the email
        const auth = {
            auth: {
                api_key: process.env.MAILGUN_API_KEY,
                domain: process.env.DOMAIN
            }
        };
        let transporter = nodemailer.createTransport( mailGun(auth) );
        let mailOptions = {
            from: email.emailFrom, // email sender
            to: email.emailTo, // email receiver
            subject: email.emailSubject,
            text: email.emailText
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error occurs: ' + err);
            }
            else {
                console.log('Email sent!!!');
            }
        });
    }
}

export const updateUser = async user => {
    let { id, name, passwordHash, email, googleReviewURL, facebookReviewURL, emailTime, waitTime, numberOfTimes } = user;
    let db = await connectDB();
    let collection = db.collection('users');
    if (name) {
        await collection.updateOne({id}, {$set: { name, email }});
    }
    if (passwordHash) {
        await collection.updateOne({id}, {$set: { passwordHash }});
    }
    if (emailTime) {
        await collection.updateOne({id}, {$set: { emailTime, waitTime, numberOfTimes }});
    }
    if (googleReviewURL) {
        await collection.updateOne({id}, {$set: { googleReviewURL }});
    }
    if (facebookReviewURL) {
        await collection.updateOne({id}, {$set: { facebookReviewURL }});
    }
} 

export const addNewCustomers = async customers => {
    let db = await connectDB();
    let collection = db.collection('customers');
    await collection.insertMany(customers);
}

export const getLatestReviewData = async owner => {
    let db = await connectDB();
    let collection = db.collection('reviews');

    //Do note this method needs to be changed to the Google Business API for the review data
    
    //Code referenced from: https://www.youtube.com/watch?v=seeK5v01p48
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disabled-setuid-sandbox']}); // Prevent non-needed issues for *NIX
	const page = await browser.newPage(); // Create request for the new page to obtain...
    
    await page.goto('https://www.google.com/maps/place/Euro+Flowers+-+Mississauga+Florist+Shop/@43.5495941,-79.5898837,17z/data=!4m7!3m6!1s0x882b4673f735b9e7:0xc46be2221a09b186!8m2!3d43.5495941!4d-79.587695!9m1!1b1?hl=en-CA'); // Define the Maps URL to Scrape...
    await page.waitFor(1000); // In case Server has JS needed to be loaded...
    const result = await page.evaluate(() => { 
		let fullNames =  document.querySelectorAll('.section-review-title');
		let postDates = document.querySelectorAll('.section-review-publish-date'); // Date Posted
		let starRatings = document.querySelectorAll('.section-review-stars'); // Star Rating
		let postReviews = document.querySelectorAll('.section-review-text'); // Review Posted by Full Name aka Poster
		let result = [];
		for (let i = 0; i < fullNames.length; i++) {
			result.push({
				fullName: fullNames[i].innerText,
				postDate: postDates[i].innerText,
				starRating: starRatings[i].getAttribute("aria-label"),
				postReview: postReviews[i].innerText,
			})
		}
        return result;
    });
    // Close the Browser
    browser.close(); 
    //This is to add the new reviews data to the database
    let reviews = [];
    for (let i = 0; i < result.length; i++) {
        //Should use email and post date to be more unique
        let review = await collection.findOne({fullName: result[i].fullName, postDate: result[i].postDate});
        //No review found therefore going to add to the collections
        if (!review) {
            result[i].owner = owner.id;
            result[i].id = uuidv4();
            reviews.push(result[i]);
        }
    }
    if (reviews.length > 0) {
        await collection.insertMany(reviews);
    }
    return reviews;
}

app.post('/email/send', async (req, res) => {
    //email is the options to use when sending the email
    let email = req.body.email;
    await sendEmail(email);
    res.status(200).send();
});

app.post('/user/update', async (req, res) => {
    let user = req.body.user;
    await updateUser(user);
    res.status(200).send();
});

app.post('/customers/new', async (req, res) => {
    let customers = req.body.customers;
    await addNewCustomers(customers);
    res.status(200).send();
});

app.post('/review/get', async (req, res) => {
    let owner = req.body.owner;
    let result = await getLatestReviewData(owner);
    res.send({reviews: result});
});
