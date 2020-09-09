import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UsernameDisplay = ({ id, name }) => (
    <span>
        <Link to={`/user/${id}`}>
            {name}
        </Link>
    </span>
);

const mapStateToProps = (state, ownProps) => {
    let user = state.users.find(user => user.id === ownProps.id);
    return user;
}

export const ConnectedUsernameDisplay = connect(mapStateToProps) (UsernameDisplay);