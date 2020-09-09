import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
import { ConnectedEmailNavigation } from './EmailNavigation';

const SendEmail = ({
    sessionID,
    emailFrom,
    send
    }) => (
    <div className="row">
        <ConnectedEmailNavigation />
        <div>
            <form className="card p-2 m-2" onSubmit={(e)=>send(sessionID, emailFrom, e)}>
                <div className="form-group">
                    <input type="text" name="emailTo" autoComplete="off" placeholder="Email To" className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="text" name="emailSubject" autoComplete="off" placeholder="Email Subject" className="form-control"/>
                </div>
                <div className="form-group">
                    <textarea id="emailText" name="emailText" rows="4" cols="50" autoComplete="off" placeholder="Email Text" className="form-control">
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>    
    </div>
);

function mapStateToProps(state, ownProps) {
    let id = state.session.id;
    let user = state.users.find(user => user.id === id);
    return {
        sessionID: id,
        emailFrom: user.email
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        send(ownerID, emailFrom, e) {
            let emailTo = e.target[`emailTo`].value;
            let emailSubject = e.target[`emailSubject`].value;
            let emailText = e.target[`emailText`].value;
            e.preventDefault();
            //Validate
            if (emailTo !== '' && emailSubject !== '' && emailText !== '') {
                dispatch(mutations.requestSendEmail(ownerID, emailFrom, emailTo, emailSubject, emailText));
            }
        }
    }
};

export const ConnectedSendEmail = connect(mapStateToProps, mapDispatchToProps) (SendEmail)