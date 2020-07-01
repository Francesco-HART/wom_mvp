import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Cookies from 'universal-cookie';
import {logIn, disconnect} from "../actions/authentication";
import FormTextField from "../components/form/FormTextField";
import Typography from '@material-ui/core/Typography';
import {Button, Link} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {addNewAddress} from '../actions/address';

class NewAddress extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = async (values) => {
        addNewAddress(values);
    };

    render() {
        const array = [
            {name: "phoneNumber", label: "Phone", type: "tel"},
            {name: "addressName", label: "Nom", type: "text"},
            {name: "address", label: "Adresse", type: "text"},
            {name: "category", label: "Categorie", type: "text"},
            {name: "city", label: "Ville", type: "text"},
            {name: "postalCode", label: "Code postal", type: "number"},
            {name: "country", label: "Pays", type: "text"},
            {name: "offer1", label: "Offre 1", type: "text"},
            {name: "offer2", label: "Offre 2", type: "text"},
            {name: "mail", label: "e-mail", type: "mail"},
            {name: "mailConfirm", label: "Confirmation", type: "mail"},
            {name: "password", label: "Mot de passe", type: "password"},
            {name: "passwordConfirm", label: "Confirmation", type: "password"},
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
                                    <LockOpenIcon/>
                                </Grid>
                                <Grid item>
                                    <Typography>Connexion</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Formik 
                        // initialValues={{
                        //     phoneNumber: "",
                        //     addressName: "",
                        //     address: "",
                        //     category: "",
                        //     city: "",
                        //     postalCode: "",
                        //     country: "",
                        //     offer1: "",
                        //     offer2: "",
                        //     mail: "",
                        //     mailConfirm: "",
                        //     password: "",
                        //     passwordConfirm: "",
                        //     webSite: ""
                        // }} 
                        initialValues={{
                                phoneNumber: "+33893025354",
                                addressName: "Café d'Orléans",
                                address: "43 Avenue du Général Leclerc",
                                category: "Bar",
                                city: "Paris",
                                postalCode: "75014",
                                country: "France",
                                offer1: "Un café",
                                offer2: "Un croissant",
                                mail: "cafe.dorleans.paris@gmail.com",
                                mailConfirm: "cafe.dorleans.paris@gmail.com",
                                password: "test123",
                                passwordConfirm: "test123",
                                webSite: "https://www.facebook.com/pages/category/French-Restaurant/Caf%C3%A9-dOrleans-Paris-139305912747539/"
                            }} 
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object({
                            phoneNumber: Yup.string().required("Champs requis"),
                            addressName: Yup.string().required("Champs requis"),
                            address: Yup.string().required("Champs requis"),
                            category: Yup.string().required("Champs requis"),
                            city: Yup.string().required("Champs requis"),
                            postalCode: Yup.string().required("Champs requis"),
                            country: Yup.string().required("Champs requis"),
                            offer1: Yup.string().required("Champs requis"),
                            offer2: Yup.string().required("Champs requis"),
                            mail: Yup.string().required("Champs requis"),
                            mailConfirm: Yup.string().required("Champs requis"),
                            password: Yup.string().required("Champs requis"),
                            passwordConfirm: Yup.string().required("Champs requis")
                        })}
                    >
                        { props => <FormTextField {...props} arrayField={array}/> }
                    </Formik>
                </>
            );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(
    connect(mapStateToProps, {})(NewAddress)
    );
