import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react'

const EmailNavigation = ({}) => (
    <div className="card p-2 m-2">
        <Link to="/email">
            <h3>Email List</h3>
        </Link>
        <Link to="/email/compose">
            <h3>Compose Email</h3>
        </Link>
        <Link to="/email/setting">
            <h3>Email Settings</h3>
        </Link>
    </div>
);

const mapStateToProps = ({session}) => ({
});

export const ConnectedEmailNavigation = connect(mapStateToProps) (EmailNavigation);
