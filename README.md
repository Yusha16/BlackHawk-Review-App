# BlackHawk-Review-App

## Project Summary
Project that was build on top of a tutorial where user can see a list of task (with different states) with CRUD functionality for the tasks.   
Link to the GitHub tutorial: https://github.com/danielstern/express-react-fullstack  
Project was build using React, Express, and MongoDB.  
The project right now have:  
- A link to email (nav link) where you can compose email to a person
- List of emails sent from this user
- Email setting such as the store Google Review URL
- Customers (csv upload for the data of the customer)  
- Review CRUD (store the data for the review on the database and grab any new review from the Google API)  
  - Will remove the grabbing part using place id when Google Business API is implemented
- User registration 
- Loading functionality (Review List view to see the implementation)
- When hosting please set the 'config var' to include the MONGODB_URI

## Getting started
Add a .env file and in that file set: MAILGUN_API_KEY and DOMAIN (both can be found in the Mailgun dashboard)  
Also when sending email must add the email to send from in Mailgun  
To set up the database: npm run initialize  
To start the project: npm run start-dev  
To log in use the account:  
- Username: Dev
- Password: TUPPLES

## Future Development
Styling up the project  
Adding a details for the emails (such as seeing if the user opened the email)  
Customer
- Details
- Update
- Delete

Add a more polished version of the email structure (use ckeditor)  
Must add code to compare the customer and review data in the database to know who to send the review email  
Update the validation for all the forms in the project  
Host the project (leave to the end of the project)  
