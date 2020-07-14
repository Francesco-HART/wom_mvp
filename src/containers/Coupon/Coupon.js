import React from 'react';
import {connect} from 'react-redux';
import {Grid, Typography, Button} from "@material-ui/core";
import {Formik} from "formik";
import * as Yup from "yup";
import FormTextField from "../../components/form/FormTextField";

import ActivityIndicator from '../../components/ActivityIndicator';
import NotFound from './NotFound';
import {getCouponByDocumentId} from '../../actions/coupon';
import {getAddressByDocumentId} from '../../actions/address';
import {getUserByDocumentId} from '../../actions/authentication';

/**
 * This class contain a form to allow a connexion thanks to a password and pseudo or mail given in TextField
 * the action 'logIn' is used to get information about user if we found it in database
 */
class Coupon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isIdNotAssociate: false,
            isNotAvailable: false,
            isAddressNotFound: false,
            isWomerNotFound: false,
            coupon: null,
            address: null,
            womer: null
        };
        this.dateCreation = [null, null];
    }

    async componentDidMount() {
        const coupon = await this.props.getCouponByDocumentId(this.props.match.params.id);
        if (coupon === null) {
            this.setState({
                isLoading: false,
                isIdNotAssociate: true
            });
        }
        else {
            if ((Date.now() / 1000) - coupon.creationDate.seconds >= 3600) {
                this.setState({
                    isLoading: false,
                    isNotAvailable: true,
                    coupon: coupon
                });
            }
            else {
                const address = await this.props.getAddressByDocumentId(coupon.addressId);
                if (address === null) {
                    this.setState({
                        isLoading: false,
                        coupon: coupon,
                        isAddressNotFound: true
                    });
                }
                else {
                    const womer = await this.props.getUserByDocumentId(coupon.womerId);
                    if (womer === null) {
                        this.setState({
                            isLoading: false,
                            coupon: coupon,
                            adress: address,
                            isWomerNotFound: true
                        });
                    }
                    else {
                        this.convertTimeStampToDate (coupon.creationDate.seconds);
                        this.setState({
                            isLoading: false,
                            coupon: coupon,
                            address: address,
                            womer: womer
                        });
                    }
                }
            }
        }
    }

    convertTimeStampToDate(time) {
        // initialize new Date object
        const date_ob = new Date(time * 1000);
        // year as 4 digits (YYYY)
        const year = date_ob.getFullYear();
        // month as 2 digits (MM)
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // date as 2 digits (DD)
        const date = ("0" + date_ob.getDate()).slice(-2);
        // hours as 2 digits (hh)
        const hours = ("0" + date_ob.getHours()).slice(-2);
        // minutes as 2 digits (mm)
        const minutes = ("0" + date_ob.getMinutes()).slice(-2);
        // seconds as 2 digits (ss)
        const seconds = ("0" + date_ob.getSeconds()).slice(-2);
        this.dateCreation = [date + " / " + month + " / "  + year, hours + ":" + minutes + ":" + seconds];
    }

    handleSubmit = (values) => {        
        if (values.validationCode === this.state.address.validationCode) {
            console.log("coupon validé");
        }
        else {
            console.log("code invalide");
        }
    };

    render() {
        /*
            http://localhost:3000/coupon/7arYwOlOEByeEXg5OXCw
        */
        if (this.state.isLoading) {
            return <ActivityIndicator />
        }

        if (this.state.isIdNotAssociate) {
            return <NotFound message="Aucun coupon lié à cet identifiant !" />;
        }

        if (this.state.isNotAvailable) {
            return <NotFound message="Ce coupon n'est plus disponible :(" />;
        }

        if (this.state.isAddressNotFound) {
            return <NotFound message="Aucune adresse associée à l'identifiant indiqué !" />;
        }

        if (this.state.isWomerNotFound) {
            return <NotFound message="Aucun womer associé à l'identifiant indiqué !" />;
        }

        const array = [
            {name: "validationCode", label: "Code de validation", type: "password"}
        ];

        return (
            <Grid container direction='column' spacing={5}>
                <Grid item>
                    <Grid container direction='row' justify='space-between'>
                        <Grid item>
                            <Typography variant="h2">
                                {this.props.address.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction='column' justify="space-between">
                                <Grid item>
                                    <Typography variant="h5">
                                        Le {this.dateCreation[0]}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">
                                        à {this.dateCreation[1]}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        {this.props.address.category}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        {this.props.address.address}, {this.props.address.postalCode}, {this.props.address.city}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        +{this.props.address.phoneNumber}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        {this.props.address.mail}
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='column' justify='center' spacing={5}>
                        <Grid item container justify='center'>
                            <Grid item>
                                <Typography variant='h5'>
                                    {this.state.coupon.selectedOffer}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container justify='center'>
                            <Grid item>
                                <Typography variant='h5'>
                                    {this.state.coupon.contribution}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Formik 
                                initialValues={{
                                    validationCode: ""
                                }} 
                                onSubmit={this.handleSubmit}
                                validationSchema={Yup.object({
                                    validationCode: Yup.string().required("Champs requis"),
                                })}
                            >
                                {props => <FormTextField {...props} arrayField={array}/>}
                            </Formik>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapsStateToProps = (state) => {
    return state;
}

export default connect(mapsStateToProps, {getCouponByDocumentId, getAddressByDocumentId, getUserByDocumentId})(Coupon);
