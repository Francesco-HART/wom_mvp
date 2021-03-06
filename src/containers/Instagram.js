import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Cookies from 'universal-cookie';
import {Grid, Typography} from "@material-ui/core";
import Insta from '@material-ui/icons/Instagram';
import FormTextField from "../components/form/FormTextField";

import {getUserByPhoneNumber, disconnect} from "../actions/authentication";

/**
 * This class contain a form to allow a connexion thanks to a password and pseudo or mail given in TextField
 * the action 'logIn' is used to get information about user if we found it in database
 */
class Login extends React.Component {

    handleSubmit = async (values) => {

    };

    render() {
        const array = [
            {name: "insta", label: "Instagram", type: "text"}
        ];
        const cookies = new Cookies();
        let cookie = cookies.get('userCookie') ? cookies.get('userCookie') : "";
        return (
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify='center' spacing={2}>
                        <Grid item>
                            <Insta/>
                        </Grid>
                        <Grid item>
                            <Typography>Connexion</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Formik 
                        initialValues={{
                            insta: "@",
                        }} 
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object({
                            insta: Yup.string().required("Champs requis")
                        })}
                    >
                        { props => <FormTextField {...props} arrayField={array}/> }
                    </Formik>
                </Grid>

            </Grid>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(
    connect( mapStateToProps, {getUserByPhoneNumber, disconnect} )(Login)
    );
