import React, { Component } from "react";
import { connect } from "react-redux";

export default (ChildComponent) => {
    class ComposedComponent extends Component {
        componentDidMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (this.props.auth.type !== 'admin' && this.props.auth.type !== 'company') this.props.history.push("/");
        }

        render() {
            if (this.props.auth.type === 'admin' || this.props.auth.type === 'company') return <ChildComponent {...this.props} />;

            return <div />;
        }
    }

    function mapStateToProps({ auth }) {
        return { auth };
    }

    return connect(mapStateToProps)(ComposedComponent);
};
