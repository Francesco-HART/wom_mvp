import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Cookies from 'universal-cookie';
import {addNewUser, isUserAlreadyExists} from "../actions/authentication";
import FormTextField from "../components/form/FormTextField";
import {Button, Grid, Typography} from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "+33",
            username: "",
            birthday: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            mail: "",
            password: "",
            status: null
        };  
    }

    handleSubmit = async (values) => {
        if (await isUserAlreadyExists(values["phoneNumber"])) {
            this.setState({
                ...values,
                status: "alreadyExists"
            });
            return;
        }
        const isCreated = await addNewUser(values) ? "success" : "error";
        this.setState({
            ...values,
            status: isCreated
        });
    };

    getMessage() {
        switch (this.state.status) {
            case "success":
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                <Grid item spacing={2}>
                                    <Button variant="contained" color="primary">
                                        Nous sommes heureux de te compte parmis nos membres !
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            case "error":
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" color="secondary">
                                        <Typography>
                                            Erreur lors de la création de l'utilisateur !
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            case "alreadyExists":
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" color="secondary">
                                        <Typography>
                                            Ce Womer existe déjà !
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    }
    
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
            {name: "password", label: "Mot de passe", type: "password"},
        ];

        const cookies = new Cookies();
        const cookie = cookies.get('userCookie') ? cookies.get('userCookie') : "";

        return (
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify='center' spacing={2}>
                        <Grid item>
                            <LockOpenIcon/>
                        </Grid>
                        <Grid item>
                            <Typography>Deviens un Womer !</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Formik 
                        initialValues={this.state} 
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
                            password: Yup.string().required("Champs requis"),
                        })}
                    >
                        { props => <FormTextField {...props} arrayField={array}/> }
                    </Formik>
                </Grid>

                <Grid item xs={12} container justify='center' spacing={2}>
                    <Typography item>
                        Déjà inscrit
                    </Typography>
                </Grid>
                <Grid item xs={12} container justify='center' spacing={2}>
                    <Button variant="contained" color="primary" href="/login">
                        Me connecter
                    </Button>
                </Grid>

                {this.getMessage()}

            </Grid>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth};
};

export default withRouter(
    connect(mapStateToProps, {addNewUser, isUserAlreadyExists})(SignIn)
    );
