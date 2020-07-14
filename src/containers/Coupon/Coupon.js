import React from 'react';
import {connect} from 'react-redux';
import {Grid, Typography, Button} from "@material-ui/core";
import {Formik} from "formik";
import * as Yup from "yup";
import FormTextField from "../../components/form/FormTextField";

import ActivityIndicator from '../../components/ActivityIndicator';
import NotFound from './NotFound';
import NotAvailable from './NotAvailable';
import {getCouponByByDocumentId} from '../../actions/coupon';

/**
 * This class contain a form to allow a connexion thanks to a password and pseudo or mail given in TextField
 * the action 'logIn' is used to get information about user if we found it in database
 */
class Coupon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isIdAssociate: true,
            isNotAvailable: false,
            address: null,
            womer: null
        };
    }

    async componentDidMount() {
        const coupon = await this.props.getCouponByByDocumentId(this.props.match.params.id);
        if (coupon === null) {
            this.setState({
                isIdAssociate: false,
                isLoading: false
            });
        }
        else {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator />
        }

        if (!this.state.isIdAssociate) {
            return <NotFound />;
        }

        if (this.state.isNotAvailable) {
            return <NotAvailable />;
        }

        return null;
    }
}

const mapsStateToProps = (state) => {
    return state;
}

export default connect(mapsStateToProps, {getCouponByByDocumentId})(Coupon);
