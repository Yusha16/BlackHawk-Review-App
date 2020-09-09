import React, { Component } from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';

export class SignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginErrorMessage: "",
            passwordErrorMessage: ""
        }
    }

    render() {
        return(
            <div className="card p-3 col-6">
                <h2>
                    Complete the following form to create a new account.
                </h2>
                <form onSubmit={(evt) => this.props.requestCreateUserAccount(evt, this)}>
                    <label>
                        <span>User Name</span>
                        <p style={{color: "red"}}>{this.state.loginErrorMessage}</p>
                        <input type="text" placeholder="username" name="username" placeholder="Car" className="form-control"/>
                    </label>
                    <label>
                        <span>Password</span>
                        <p style={{color: "red"}}>{this.state.passwordErrorMessage}</p>
                        <input type="text" placeholder="password" name="password" placeholder="APPLE" className="form-control mt-2"/>
                    </label>
                    {this.props.authenticated == mutations.USERNAME_RESERVED ? <p>A user by that name already exists.</p> : null}
                    <button type="submit" className="form-control mt-2 btn btn-primary">Sign Up</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    authenticated:state.session.authenticated
});

const mapDispatchToProps = (dispatch, ownProps)=>({
    requestCreateUserAccount(e, signupComponent){
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        //Validate
        if (username !== "" && password !== "") {
            dispatch(mutations.requestCreateUserAccount(username,password));
        }
        else {
            if (username === "") {
                signupComponent.setState({loginErrorMessage: 'Empty Login Name'});
            }
            if (password === "") {
                signupComponent.setState({passwordErrorMessage: 'Empty Password'});
            } 
        }
    }
})

export const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);