import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
//import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';
import { take } from 'redux-saga/effects';

export const store = createStore(
    combineReducers({
        session(userSession = defaultState.session || {}, action) {
            //return userSession;
            let {type, authenticated, session} = action;
            switch (type) {
                case mutations.SET_STATE:
                    return {...userSession, id:action.state.session.id};
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return { ...userSession, authenticated:mutations.AUTHENTICATING };
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return { ...userSession, authenticated };
                case mutations.LOADING:
                    return { ...userSession, loading: true };
                case mutations.LOADING_DONE:
                    return { ...userSession, loading: false };
                default:
                    return userSession;
            }
        },
        users(users = [], action) {
            //return users;
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.users;
                case mutations.UPDATE_USER:
                    return users.map(user => {
                        return (user.id === action.id) ?
                            {...user, 
                                name: action.username,
                                passwordHash: action.passwordHash,
                                email: action.email
                            } :
                            user;
                    });
                case mutations.UPDATE_EMAIL_SETTINGS:
                    return users.map(user => {
                        return (user.id === action.id) ?
                            {...user, 
                                googleReviewURL: action.googleReviewURL,
                                facebookReviewURL: action.facebookReviewURL,
                                emailTime: action.emailTime,
                                waitTime: action.waitTime,
                                numberOfTimes: action.numberOfTimes
                            } :
                            user;
                    });
            }
            return users;
        },
        emails(emails = [], action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.emails;
                case mutations.SEND_EMAIL:
                    return [...emails, {
                        id: action.emailID,
                        owner: action.ownerID,
                        emailFrom: action.emailFrom,
                        emailTo: action.emailTo,
                        emailSubject: action.emailSubject,
                        emailText: action.emailText
                    }]
            }
            return emails;
        },
        customers(customers = [], action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.customers;
                case mutations.CREATE_CUSTOMERS:
                    return [...customers].concat(action.customers);
            }
            return customers;
        },
        reviews(reviews = [], action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.reviews;
                case mutations.SET_REVIEWS_STATE:
                    return [...reviews].concat(action.reviews);
            }
            return reviews;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}