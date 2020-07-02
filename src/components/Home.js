import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Bienvenue sur Wom</p>
                <p>Visitez notre <a href="http://womparis.com" target="_blank">site vitrine</a> !</p>
            </div>
        );
    }
}

export default withRouter(
    connect()(Home)
    );
