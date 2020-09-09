import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react'

const CustomerNavigation = ({}) => (
    <div className="card p-2 m-2">
        <Link to="/customer">
            <h3>Customer List</h3>
        </Link>
        <Link to="/customer/upload">
            <h3>Upload Customer</h3>
        </Link>
    </div>
);

const mapStateToProps = ({session}) => ({
});

export const ConnectedCustomerNavigation = connect(mapStateToProps) (CustomerNavigation);
