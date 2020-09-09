export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER';
export const AUTHENTICATING ='AUTHENTICATING';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const SET_STATE = 'SET_STATE';
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const REQUEST_USER_ACCOUNT_CREATION = `REQUEST_USER_ACCOUNT_CREATION`;
export const REQUEST_COMMENT_CREATION = 'REQUEST_COMMENT_CREATION';
export const CREATE_COMMENT = 'CREATE_COMMENT';

export const REQUEST_SEND_EMAIL = 'REQUEST_SEND_EMAIL';
export const SEND_EMAIL = 'SEND_EMAIL';

export const UPDATE_USER = 'UPDATE_USER';

export const UPDATE_EMAIL_SETTINGS = 'UPDATE_EMAIL_SETTINGS';

export const REQUEST_CUSTOMERS_CREATION = 'REQUEST_CUSTOMERS_CREATION';
export const CREATE_CUSTOMERS = 'CREATE_CUSTOMERS';

export const REQUEST_LATEST_REVIEW_DATA = 'REQUEST_LATEST_REVIEW_DATA';

export const SET_REVIEWS_STATE = 'SET_REVIEWS_STATE';

export const LOADING = 'LOADING';
export const LOADING_DONE = 'LOADING_DONE';

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status
});

export const requestCreateUserAccount = (username,password)=>({
    type:REQUEST_USER_ACCOUNT_CREATION,
    username,
    password
});

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
});

export const loading = () => ({
    type: LOADING
});

export const loadingDone = () => ({
    type: LOADING_DONE
});

export const requestSendEmail = (ownerID, emailFrom, emailTo, emailSubject, emailText) => ({
    type: REQUEST_SEND_EMAIL,
    ownerID,
    emailFrom,
    emailTo,
    emailSubject,
    emailText
});

export const sendEmail = (emailID, ownerID, emailFrom, emailTo, emailSubject, emailText) => ({
    type: SEND_EMAIL,
    ownerID,
    emailID,
    emailFrom,
    emailTo,
    emailSubject,
    emailText
});

export const updateUser = (id, username, passwordHash, email) => ({
    type: UPDATE_USER,
    id,
    username,
    passwordHash,
    email
});

export const updateEmailSettings = (id, googleReviewURL, facebookReviewURL, emailTime, waitTime, numberOfTimes) => ({
    type: UPDATE_EMAIL_SETTINGS,
    id,
    googleReviewURL,
    facebookReviewURL,
    emailTime,
    waitTime,
    numberOfTimes
});

export const requestCustomersCreation = (ownerID, customers) => ({
    type: REQUEST_CUSTOMERS_CREATION,
    ownerID,
    customers
});

export const createCustomers = (ownerID, customers) => ({
    type: CREATE_CUSTOMERS,
    ownerID,
    customers
});

export const requestLatestReviewData = (ownerID) => ({
    type: REQUEST_LATEST_REVIEW_DATA,
    ownerID
});

export const setReviewsState = (reviews) => ({
    type: SET_REVIEWS_STATE,
    reviews
});