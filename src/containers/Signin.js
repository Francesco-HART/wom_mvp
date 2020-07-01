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

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false
        };
    }

    handleSubmit = async (values) => {
        console.log("send data : " + values);
    };


    render() {
        const array = [
            {name: "phoneNumber", label: "Phone", type: "tel"},
            {name: "username", label: "Pseudo", type: "text"},
            {name: "birthday", label: "Date de naissance", type: "date"},
            {name: "address", label: "Adresse", type: "text"},
            {name: "city", label: "Ville", type: "text"},
            {name: "postalCode", label: "Code postal", type: "number"},
            {name: "country", label: "Pays", type: "text"},
            {name: "mail", label: "e-mail", type: "mail"},
            {name: "mailConfirm", label: "Confirmation", type: "mail"},
            {name: "password", label: "Mot de passe", type: "password"},
            {name: "passwordConfirm", label: "Confirmation", type: "password"}
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
                        initialValues={{
                            phoneNumber: "",
                            username: "",
                            birthday: "",
                            address: "",
                            city: "",
                            postalCode: "",
                            country: "",
                            mail: "",
                            mailConfirm: "",
                            password: "",
                            passwordConfirm: ""
                        }} 
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object({
                            phoneNumber: Yup.string().required("Champs requis"),
                            username: Yup.string().required("Champs requis"),
                            birthday: Yup.string().required("Champs requis"),
                            address: Yup.string().required("Champs requis"),
                            city: Yup.string().required("Champs requis"),
                            postalCode: Yup.string().required("Champs requis"),
                            country: Yup.string().required("Champs requis"),
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
    return {auth};
};

export default withRouter(
    connect(mapStateToProps, {})(SignIn)
    );
