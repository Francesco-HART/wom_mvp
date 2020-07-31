import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import requireAuth from "./middleware/requireAuth";
import requireNoAuth from "./middleware/requireNoAuth";
import Home from './components/Home';
import Address from './containers/Address/Address';
import Coupon from './containers/Coupon/Coupon';
import NewAddress from './containers/NewAdress/NewAddress';
import Signin from './containers/Signin';
import LoginAdmin from './containers/LoginAdmin';
import Instagram from './containers/Instagram';
import HomeAdmin from './containers/HomeAdmin';

const Container = (props) => (
    <div>

    </div>
);

function Routes(props) {
    console.log(props.auth)
    return (
        <Switch>
            <Route exact path="/" component={props.auth && props.auth.type === 'admin' ? HomeAdmin : Home}/>
            <Route exact path="/login" component={requireNoAuth(LoginAdmin)}/>
            <Route exact path="/signin" component={requireNoAuth(Signin)}/>
            <Route exact path="/address/:id" component={requireNoAuth(Address)}/>
            <Route exact path="/coupon/:id" component={requireNoAuth(Coupon)}/>
            <Route exact path="/instagram" component={requireAuth(Instagram)}/>
            <Route exact path="/newaddress" component={requireAuth(NewAddress)}/>
        </Switch>
    );
}

const mapStateToProps = ({auth}) => {
    return {auth};
};

export default withRouter(
    connect(mapStateToProps, {})(withRouter(Routes))
);
