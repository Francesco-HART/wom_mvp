import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("Home");
        console.log("props");
        console.log(this.props);
        return (
            <div>
                <p>Bienvenue sur Wom</p>
                <p>Visiter notre <a href="womparis.com">site vitrine</a> !</p>
            </div>
        );
    }
}

export default withRouter(
    connect()(Home)
    );
