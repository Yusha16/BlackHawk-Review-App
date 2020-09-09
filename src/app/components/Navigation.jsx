import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react'

import * as mutations from '../store/mutations';
import { ConnectedUsernameDisplay } from './UsernameDisplay';
import { ConnectedSendEmail } from './SendEmail';

const Navigation = ({ id, authenticated }) => (
    <div>
        <Link to="/dashboard">
            <h1>
                Black Hawk Review App
            </h1>
        </Link>

        { authenticated ?
            <h2>
                <ConnectedUsernameDisplay id={id} />
            </h2>
            : null
        }
        <Link to="/dashboard">
            <h2>Dashboard</h2>
        </Link>
        <Link to="/email">
            <h2>Email</h2>
        </Link>
        <Link to="/customer">
            <h2>Customer</h2>
        </Link>
        <Link to="/review">
            <h2>Review</h2>
        </Link>
    </div>
);

const mapStateToProps = ({session}) => ({
    id: session.id,
    authenticated: session.authenticated === mutations.AUTHENTICATED
});

export const ConnectedNavigation = connect(mapStateToProps) (Navigation);
