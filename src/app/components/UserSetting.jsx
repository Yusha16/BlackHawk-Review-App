import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
import md5 from 'md5';

const UserSetting = ({
    id,
    name,
    email,
    updateSetting,
    }) => (
    <div className="row">
        <div>
            <h2 className="p-2 m-2">Settings</h2>
            <form className="card p-2 m-2" onSubmit={(e)=>updateSetting(id, e)}>
                <div className="form-group">
                    <label name="username">Username: </label>
                    <input type="text" name="username" autoComplete="off" defaultValue={`${name}`} className="form-control"/>
                </div>
                <div className="form-group">
                    <label name="username">Password: </label>
                    <input type="text" name="password" autoComplete="off" placeholder="New Password" className="form-control"/>
                </div>
                <div className="form-group">
                    <label name="username">Confirm Password: </label>
                    <input type="text" name="confirmPassword" autoComplete="off" placeholder="Confirm Password" className="form-control"/>
                </div>
                <div className="form-group">
                    <label name="username">Email: </label>
                    <input type="text" name="email" autoComplete="off" defaultValue={`${email}`} className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Update User Settings</button>
            </form>
        </div>    
    </div>
);

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let user = state.users.find(user => user.id === id);
    return user;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateSetting(ownerID, e) {
            let username = e.target[`username`].value;
            let password = e.target[`password`].value;
            let confirmPassword = e.target[`confirmPassword`].value;
            let email = e.target[`email`].value;
            e.preventDefault();
            //Validate
            if (username !== '' && password === confirmPassword && email !== '') {
                let passwordHash = md5(password);
                dispatch(mutations.updateUser(ownerID, username, passwordHash, email));
            }
        }
    }
};

export const ConnectedUserSetting = connect(mapStateToProps, mapDispatchToProps) (UserSetting)