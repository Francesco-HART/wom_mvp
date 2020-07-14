import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Cookies from 'universal-cookie';
import QRCode from 'qrcode.react';

import {Typography, Button, Grid} from '@material-ui/core';
import Earth from "@material-ui/icons/AddLocation";

import FormTextField from "../components/form/FormTextField";
import ActivityIndicator from '../components/ActivityIndicator';

import {SHOW_SNACKBAR} from '../actions/type';
import {addNewAddress, isAddressAlreadyExists} from '../actions/address';


class NewAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            name: "",
            address: "",
            category: "",
            city: "",
            postalCode: "",
            country: "",
            offer1: "",
            offer2: "",
            mail: "",
            password: "",
            webSite: "",
            documentId : null,
            status: null
        };
    }

    handleSubmit = async (values) => {
        this.setState({isLoading: true});
        // check si c'est bon
        // [...]
        /// end
        if (await this.props.isAddressAlreadyExists(values["name"], values["city"], values["postalCode"], values["country"])) {
            this.setState({isLoading: false}, () => {
                this.props.dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Cette adresse existe déjà !", variant: "error"}
                });
            });
            return;
        }
        this.setState({documentId: await this.props.addNewAddress(values), isLoading: false});
    };

    getAddressInformation() {
        if (this.state.isLoading) {
            return <ActivityIndicator />;
        }
        if (this.state.documentId !== null) {
            return (
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={5}>
                            <Grid item>
                                <Button variant="contained" color="primary" href="https://fr.qr-code-generator.com/" target="_blank">
                                    Générer le QR Code avec l'url suivante :
                                </Button>
                                <Typography>
                                    http://localhost:3000/address/{this.state.documentId}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={5}>
                            <Grid item>
                                <Typography>
                                    Ou enregistrez-le !
                                </Typography>
                                <QRCode value={"http://localhost:3000/address/" + this.state.documentId} />
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={5}>
                            <Grid item>
                                <Button variant="contained" color="primary" href={"/address/" + this.state.documentId}>
                                    Voir ma nouvelle adresse !
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        return null;
    }

    render() {
        const array = [
            {name: "phoneNumber", label: "Phone", type: "tel"},
            {name: "name", label: "Nom", type: "text"},
            {name: "address", label: "Adresse", type: "text"},
            {name: "category", label: "Categorie", type: "text"},
            {name: "city", label: "Ville", type: "text"},
            {name: "postalCode", label: "Code postal", type: "number"},
            {name: "country", label: "Pays", type: "text"},
            {name: "offer1", label: "Offre 1", type: "text"},
            {name: "offer2", label: "Offre 2", type: "text"},
            {name: "mail", label: "e-mail", type: "mail"},
            {name: "password", label: "Mot de passe", type: "password"},
            {name: "webSite", label: "Site web (facultatif)", type: "url"}
        ];

        const cookies = new Cookies();
        const cookie = cookies.get('userCookie') ? cookies.get('userCookie') : "";
            return (
                <>
                    <Grid container justify='center' spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify='center' spacing={2}>
                                <Grid item>
                                    <Earth/>
                                </Grid>
                                <Grid item>
                                    <Typography>Nouvelle adresse Wom !</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Formik 
                        initialValues={this.state} 
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object({
                            phoneNumber: Yup.string().required("Champs requis"),
                            name: Yup.string().required("Champs requis"),
                            address: Yup.string().required("Champs requis"),
                            category: Yup.string().required("Champs requis"),
                            city: Yup.string().required("Champs requis"),
                            postalCode: Yup.string().required("Champs requis"),
                            country: Yup.string().required("Champs requis"),
                            offer1: Yup.string().required("Champs requis"),
                            offer2: Yup.string().required("Champs requis"),
                            mail: Yup.string().required("Champs requis"),
                            password: Yup.string().required("Champs requis"),
                        })}
                    >
                        { props => <FormTextField {...props} arrayField={array}/> }
                    </Formik>

                    {this.getAddressInformation()}
                </>
            );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(
    connect(mapStateToProps, {addNewAddress, isAddressAlreadyExists})(NewAddress)
);
