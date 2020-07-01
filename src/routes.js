import React from "react";
import {Route, Switch} from "react-router-dom";
import Connexion from './containers/Connexion'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import requireAuth from "./middleware/requireAuth";
import requireAdmin from "./middleware/requireAdmin";
import requireNoAuth from "./middleware/requireNoAuth";


const Container = (props) => (
    <div>

    </div>
);

function Routes(props) {

    return (
        <Switch>
            <Route exact path="/wom/connexion" component={requireNoAuth(Connexion)}/>
            <Route exact path="/wom/enregistrement/:id" component={requireNoAuth(Connexion)}/>
            <Route exact path="/wom/product/:id" component={requireNoAuth(Connexion)}/>
            <Route component={Container}/>
        </Switch>
    );
}


const mapStateToProps = ({auth}) => {
    return {auth}
}

export default withRouter(connect(
    mapStateToProps,
    {}
)(withRouter(Routes)))
