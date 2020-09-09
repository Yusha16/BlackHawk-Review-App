import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
import { ConnectedEmailNavigation } from './EmailNavigation';

const EmailSetting = ({
    sessionID,
    googleReviewURL,
    facebookReviewURL,
    emailTime,
    waitTime,
    numberOfTimes,
    updateSettings,
    }) => (
    <div className="row">
        <ConnectedEmailNavigation />
        <div>
            <h2 className="p-2 m-2">Email Settings</h2>
            <form className="card p-2 m-2" onSubmit={(e)=>updateSettings(sessionID, e)}>
                <div className="form-group">
                    <label name="googleReviewURL">Google Review URL: </label>
                    <input type="url" name="googleReviewURL" autoComplete="off" defaultValue={`${googleReviewURL}`} className="form-control"/>
                </div>
                <div className="form-group">
                    <label name="facebookReviewURL">Facebook Review URL: </label>
                    <input type="url" name="facebookReviewURL" autoComplete="off" defaultValue={`${facebookReviewURL}`} className="form-control"/>
                </div>
                <div className="form-group">
                    <label name="emailTime">Batch Email Time: </label>
                    <input type="time" name="emailTime" autoComplete="off" defaultValue={`${emailTime}`} className="form-control"/>
                </div>
                <div className="form-group">
                    <label name="waitTime">Wait time (in hours): </label>
                    <input type="number" name="waitTime" autoComplete="off" defaultValue={`${waitTime}`} className="form-control"/>
                </div>
                <div className="form-group">
                    <label name="numberOfTimes">Number of time(s): </label>
                    <input type="number" name="numberOfTimes" autoComplete="off" defaultValue={`${numberOfTimes}`} className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Update Email Settings</button>
            </form>
        </div>    
    </div>
);

const mapStateToProps = (state, ownProps) => {
    let id = state.session.id;
    let user = state.users.find(user => user.id === id);
    return {
        sessionID: id,
        googleReviewURL: user.googleReviewURL,
        facebookReviewURL: user.facebookReviewURL,
        emailTime: user.emailTime,
        waitTime: user.waitTime,
        numberOfTimes: user.numberOfTimes
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateSettings(ownerID, e) {
            let googleReviewURL = e.target[`googleReviewURL`].value;
            let facebookReviewURL = e.target[`facebookReviewURL`].value;
            let emailTime = e.target[`emailTime`].value;
            let waitTime = e.target[`waitTime`].value;
            let numberOfTimes = e.target[`numberOfTimes`].value;
            e.preventDefault();
            //Validate
            if (emailTime !== '' && waitTime !== '' && numberOfTimes !== '') {
                dispatch(mutations.updateEmailSettings(ownerID, googleReviewURL, facebookReviewURL, emailTime, waitTime, numberOfTimes));
            }
        }
    }
};

export const ConnectedEmailSetting = connect(mapStateToProps, mapDispatchToProps) (EmailSetting)