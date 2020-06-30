import React from "react";
import {Route, Switch} from "react-router-dom";
import Connexion from './containers/Connexion'
import Inscription from './containers/Inscription'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import requireAuth from "./middleware/requireAuth";
import requireAdmin from "./middleware/requireAdmin";
import UpdateAccount from "./containers/UpdateAccount";
import requireNoAuth from "./middleware/requireNoAuth";
import ForgotPassword from "./containers/ForgotPassword";
import Home from "./containers/Home";
import CreateUser from "./containers/CreateUser"
import CreatePost from "./containers/CreateTrader"
import Cartography from "./containers/Cartography"

const Container = (props) => (
    <div>
        <Route exact path="/utilisateur/creer" component={requireAdmin(CreateUser)}/>
        <Route exact path="/profil/informations" component={UpdateAccount}/>
    </div>
);

function Routes(props) {

    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/post/creer" component={CreatePost}/>
            <Route exact path="/connexion" component={requireNoAuth(Connexion)}/>
            <Route exact path="/inscription" component={requireNoAuth(Inscription)}/>
            <Route exact path="/destockage" component={Cartography}/>
            <Route exact path="/profil/motdepasse" component={requireNoAuth(ForgotPassword)}/>
            <Route component={requireAuth(Container)}/>
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
