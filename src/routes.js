import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import requireAuth from "./middleware/requireAuth";
import requireAdmin from "./middleware/requireAdmin";
import requireNoAuth from "./middleware/requireNoAuth";
import Home from './components/Home';
import Address from './containers/Address';
import NewAddress from './containers/NewAddress';
import Login from './containers/Login'
import Signin from './containers/Signin'
import LoginAdmin from './containers/LoginAdmin'

function Routes(props) {
    return (
            <Switch>
                <Route exact path="/address/:id" component={requireNoAuth(Address)}/>
                <Route exact path="/address/:id/login" component={requireNoAuth(Login)}/>
                <Route exact path="/new-address" component={requireNoAuth(NewAddress)}/>
                <Route exact path="/login" component={requireNoAuth(Login)}/>
                <Route exact path="/signin" component={requireNoAuth(Signin)}/>
                <Route exact path="/login-admin" component={requireNoAuth(LoginAdmin)}/>
                <Route component={Home}/>
            </Switch>
        );
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(
    connect(mapStateToProps, {})(withRouter(Routes))
    );
