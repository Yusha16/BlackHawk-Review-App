import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { ConnectedCustomerNavigation } from './CustomerNavigation';

export const CustomerList = ({
    customers,
    id,
    
}) => (
    <div className="row">    
        <ConnectedCustomerNavigation />
        <div className="card p-2 m-2">
            {customers.map(customer => (
                <Link to={`/customer/${customer.id}`} key={customer.id}>
                    <div className="card p-2 mt-2">
                        {customer.name}
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
        customers: state.customers
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}

export const ConnectedCustomerList = connect(mapStateToProps, mapDispatchToProps) (CustomerList);