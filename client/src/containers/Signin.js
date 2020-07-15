import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Cookies from 'universal-cookie';
import {Link, Grid, Typography} from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';
// import Checkbox from '../components/Checkbox';

import {addNewUser, isUserAlreadyExists} from "../actions/authentication";
import FormTextField from "../components/form/FormTextField";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "33",
            username: "",
            idInsta: "@",
            birthday: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            mail: "",
            password: "",
            isAnAddress: false
        };
    }

    handleSubmit = async (values) => {
        if (await this.props.isUserAlreadyExists(values["phoneNumber"])) {
            return;
        }

        if (await this.props.addNewUser(values, this.state.isAnAddress)) {
            this.props.history.push('/login');
        }
    };
    
    toggleCheckboxChange = () => {
        this.setState({isAnAddress: !this.state.isAnAddress});
    }

    getIsAnAddress() {
        return <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            value="isAnAddress"
                            checked={this.state.isAnAddress}
                            onChange={this.toggleCheckboxChange}
                        />
                        Compte Adresse
                    </label>
                </div>;
    }

    render() {
        const array = [
            {name: "phoneNumber", label: "Phone (33 6 01 02 03 04)", type: "tel"},
            {name: "username", label: "Pseudo", type: "text"},
            {name: "idInsta", label: "Instagram", type: "text"},
            {name: "birthday", label: "Date de naissance", type: "date"},
            {name: "address", label: "Adresse", type: "text"},
            {name: "city", label: "Ville", type: "text"},
            {name: "postalCode", label: "Code postal", type: "number"},
            {name: "country", label: "Pays", type: "text"},
            {name: "mail", label: "e-mail", type: "mail"},
            {name: "password", label: "Mot de passe", type: "password"}
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
                <Grid item>
                    {this.getIsAnAddress()}
                </Grid>
                <Grid item xs={12}>
                    <Formik 
                        initialValues={this.state} 
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object({
                            phoneNumber: Yup.string().required("Champs requis"),
                            username: Yup.string().required("Champs requis"),
                            idInsta: Yup.string().required("Champs requis"),
                            birthday: Yup.string().required("Champs requis"),
                            address: Yup.string().required("Champs requis"),
                            city: Yup.string().required("Champs requis"),
                            postalCode: Yup.string().required("Champs requis"),
                            country: Yup.string().required("Champs requis"),
                            mail: Yup.string().required("Champs requis"),
                            password: Yup.string().required("Champs requis")
                        })}
                    >
                        { props => <FormTextField {...props} arrayField={array}/> }
                    </Formik>
                </Grid>

                <Grid item xs={12} container justify='center' spacing={2}>
                    <Link href="/login">
                        <Typography variant={'body2'}>Déjà inscrit</Typography>
                    </Link>
                </Grid>
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
