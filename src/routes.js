import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import requireAuth from "./middleware/requireAuth";
import requireNoAuth from "./middleware/requireNoAuth";
import Home from './components/Home';
import Address from './containers/Address';
import NewAddress from './containers/NewAddress';
import Signin from './containers/Signin'
import Instagram from './containers/Instagram';
import PhoneValidation from "./containers/PhoneValidation";


const Container = (props) => (
    <div>
        <Route exact path="/instagram" component={requireAuth(Instagram)}/>
        <Route exact path="/new-address" component={requireAuth(NewAddress)}/>
        <Route exact path="/address/:id" component={requireAuth(Address)}/>
    </div>
);

function Routes(props) {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={requireNoAuth(PhoneValidation)}/>
            <Route exact path="/signin" component={requireNoAuth(Signin)}/>
            <Route component={requireAuth(Container)}/>
        </Switch>
    );
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(
    connect(mapStateToProps, {})(withRouter(Routes))
);
