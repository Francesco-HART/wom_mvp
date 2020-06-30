import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";


export default (ChildComponent) => {
    class ComposedComponent extends Component {
        componentDidMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!this.props.auth) this.props.history.push("/");
        }

        render() {
            if (this.props.auth) return <ChildComponent {...this.props} />;

            return <div />;
        }
    }

    function mapStateToProps({ auth }) {
        return { auth };
    }

    return withRouter(connect(mapStateToProps)(withRouter(ComposedComponent)));
};
