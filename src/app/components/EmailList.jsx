import React from 'react'
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from 'react-router-dom';
import { ConnectedEmailNavigation } from './EmailNavigation';

export const EmailList = ({
    emails,
    id,
    
}) => (
    <div className="row">    
        <ConnectedEmailNavigation />
        <div className="card p-2 m-2">
            {emails.map(email => (
                <Link to={`/email/details/${email.id}`} key={email.id}>
                    <div className="card p-2 mt-2">
                        {email.emailFrom} | {email.emailSubject} - {email.emailText}
                    </div>
                </Link>
            ))}
        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let id = state.session.id;
    return {
        id: id,
        emails: state.emails
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}

export const ConnectedEmailList = connect(mapStateToProps, mapDispatchToProps) (EmailList);