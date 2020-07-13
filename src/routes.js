import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import requireAuth from "./middleware/requireAuth";
import requireNoAuth from "./middleware/requireNoAuth";
import Home from './components/Home';
import Address from './containers/Address/Address';
import NewAddress from './containers/NewAddress';
import Signin from './containers/Signin';
import LoginAdmin from './containers/LoginAdmin';
import Instagram from './containers/Instagram';

const Container = (props) => (
    <div>
        <Route exact path="/instagram" component={requireAuth(Instagram)}/>
        <Route exact path="/new-address" component={requireAuth(NewAddress)}/>
    </div>
);

function Routes(props) {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={requireNoAuth(LoginAdmin)}/>
            <Route exact path="/signin" component={requireNoAuth(Signin)}/>
            <Route exact path="/address/:id" component={requireNoAuth(Address)}/>
            <Route component={requireAuth(Container)}/>
        </Switch>
    );
}

const mapStateToProps = ({auth}) => {
    return {auth};
};

export default withRouter(
    connect(mapStateToProps, {})(withRouter(Routes))
);
