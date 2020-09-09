import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { ConnectedEmailNavigation } from './EmailNavigation';

export const EmailDetail = ({
    email,
    id,
    
}) => (
    <div className="row">    
        <ConnectedEmailNavigation />
        <div className="card p-2 m-2">
            <div>
                {email.emailSubject}
            </div>
            <div>
                {email.emailTo}
            </div>
            <div>
                {email.emailText}
            </div>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let email = state.emails.find(email => email.id === id);
    return {
        id: id,
        email: email
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}

export const ConnectedEmailDetail = connect(mapStateToProps, mapDispatchToProps) (EmailDetail);