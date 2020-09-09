import React from "react";
import { Provider, connect } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard, Dashboard } from "./Dashboard";
import { ConnectedLogin } from "./Login";
import { ConnectedSignup } from "./SignUp";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import { Redirect } from "react-router-dom";
import { ConnectedSendEmail } from "../components/SendEmail";
import { ConnectedUserSetting } from "./UserSetting";
import { ConnectedEmailSetting } from "./EmailSetting";
import { ConnectedEmailList } from "./EmailList";
import { ConnectedEmailDetail } from "./EmailDetail";
import { ConnectedCustomerList } from "./CustomerList";
import { ConnectedCustomerUpload } from "./CustomerUpload";
import { ConnectedReviewList } from "./ReviewList";
import { ConnectedReviewDetail } from "./ReviewDetail";

const RouteGuard = Component => ({match}) => {
    console.info("Route Guard", match);
    if (!store.getState().session.authenticated) {
        return <Redirect to="/" />;
    } {
        return <Component match={match} />;
    }
}

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation />
                <Route exact path="/" component={ConnectedLogin} />
                <Route exact path="/signup" component={ConnectedSignup}/>
                <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)}/>
                <Route exact path="/email/compose" component={RouteGuard(ConnectedSendEmail)} />
                <Route exact path="/email/setting" component={RouteGuard(ConnectedEmailSetting)} />
                <Route exact path="/email" component={RouteGuard(ConnectedEmailList)} />
                <Route exact path="/email/details/:id" component={RouteGuard(ConnectedEmailDetail)} />
                <Route exact path="/user/:id" component={RouteGuard(ConnectedUserSetting)} />
                <Route exact path="/customer" component={RouteGuard(ConnectedCustomerList)} />
                <Route exact path="/customer/upload" component={RouteGuard(ConnectedCustomerUpload)} />
                <Route exact path="/review" component={RouteGuard(ConnectedReviewList)} />
                <Route exact path="/review/:id" component={RouteGuard(ConnectedReviewDetail)} />
            </div>
        </Provider>
    </Router>
)
