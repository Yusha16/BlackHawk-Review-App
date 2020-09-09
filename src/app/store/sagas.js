import { take, put, select } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import * as mutations from './mutations';
import { history } from './history';

const url = process.env.NODE_ENV == 'production' ? '' : "http://localhost:7777";

export function* userAuthenticationSaga() {
    while(true) {
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const { data } = yield axios.post(url + `/authenticate`, {username, password});
            if (!data) {
                throw new Error();
            }
            console.log("Authenticated!", data);

            yield put(mutations.setState(data.state));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

            history.push('/dashboard');
        }
        catch (e) {
            console.log("Can't authenticate");
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }

    }
}

export function* userAccountCreationSaga(){
    while (true) {
        const {username, password } = yield take(mutations.REQUEST_USER_ACCOUNT_CREATION);
        try {
            const { data } = yield axios.post(url + `/user/create`, {username,password});
            console.log(data);

            yield put(mutations.setState({...data.state,session:{id:data.userID}}));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

            history.push('/dashboard');

        } catch (e) {
            console.error("Error",e);
            yield put(mutations.processAuthenticateUser(mutations.USERNAME_RESERVED));
        }
    }
}

export function* emailCreationSaga() {
    while (true) {
        const { ownerID, emailFrom, emailTo, emailSubject, emailText } = yield take(mutations.REQUEST_SEND_EMAIL);
        const emailID = uuidv4();
        yield put(mutations.sendEmail(emailID, ownerID, emailFrom, emailTo, emailSubject, emailText));
        const { res } = yield axios.post(url + '/email/send', {
            email: {
                id: emailID,
                owner: ownerID,
                emailFrom: emailFrom,
                emailTo: emailTo,
                emailSubject: emailSubject,
                emailText: emailText
            }
        });
    }
}

export function* userModificationSaga() {
    while (true) {
        const user = yield take(mutations.UPDATE_USER);
        axios.post(url + `/user/update`, {
            user: {
                id: user.id,
                name: user.username,
                passwordHash: user.passwordHash,
                email: user.email
            }
        });
    }
}

export function* emailSettingsModificationSaga() {
    while (true) {
        const user = yield take(mutations.UPDATE_EMAIL_SETTINGS);
        axios.post(url + `/user/update`, {
            user: {
                id: user.id,
                googleReviewURL: user.googleReviewURL,
                facebookReviewURL: user.facebookReviewURL,
                emailTime: user.emailTime,
                waitTime: user.waitTime,
                numberOfTimes: user.numberOfTimes
            }
        });
    }
}

export function* customerCreationSaga() {
    while (true) {
        const { ownerID, customers } = yield take(mutations.REQUEST_CUSTOMERS_CREATION);
        for (let i = 0; i < customers.length; i++) {
            customers[i].owner = ownerID;
            customers[i].id = uuidv4();
        }
        yield put(mutations.createCustomers(ownerID, customers));
        const { res } = yield axios.post(url + '/customers/new', {
            customers: customers
        });
    }
}

export function* getLatestReviewData() {
    while (true) {
        const { ownerID } = yield take(mutations.REQUEST_LATEST_REVIEW_DATA);
        let reviews = [];
        //Get the Latest Review Data Online
        yield axios.post(url + '/review/get', {
            owner: {
                id: ownerID
            }
        }).then(res => {
            reviews = res.data.reviews;
        });
        //Update the State to include the new Review(s) Data
        yield put(mutations.setReviewsState(reviews));
        yield put(mutations.loadingDone());
    }
}