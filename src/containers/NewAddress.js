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
import {addNewAddress, findAddressByAddressName} from '../actions/address';

class NewAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            addressName: "",
            address: "",
            category: "",
            city: "",
            postalCode: "",
            country: "",
            offer1: "",
            offer2: "",
            mail: "",
            mailConfirm: "",
            password: "",
            passwordConfirm: "",
            webSite: "",
            documentId : null
        };
    }

    handleSubmit = async (values) => {
        this.setState({
            phoneNumber: values["phoneNumber"],
            addressName: values["addressName"],
            address: values["address"],
            category: values["category"],
            city: values["city"],
            postalCode: values["postalCode"],
            country: values["country"],
            offer1: values["offer1"],
            offer2: values["offer2"],
            mail: values["mail"],
            mailConfirm: values["mailConfirm"],
            password: values["password"],
            passwordConfirm: values["passwordConfirm"],
            webSite: values["webSite"]
        });

        // check si c'est bon
        // [...]
        /// end

        const documentId = await addNewAddress(values);
        if (documentId != undefined && documentId != null) {
            this.setState({
                phoneNumber: "",
                addressName: "",
                address: "",
                category: "",
                city: "",
                postalCode: "",
                country: "",
                offer1: "",
                offer2: "",
                mail: "",
                mailConfirm: "",
                password: "",
                passwordConfirm: "",
                webSite: "",
                documentId: documentId
            });
        }
    };

    getDocumentId() {
        return this.state.documentId == null ? null :
            <div>
                <p>Adresse créé avec l'id : {this.state.documentId}</p>
                <p><a href="https://fr.qr-code-generator.com/" target="_blank">Générer le QRCode</a> avec l'url suivante : http://localhost:3000/address/{this.state.documentId}</p>
            </div>
        ;
    }

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
                        initialValues={this.state} 
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

                    {this.getDocumentId()}
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
