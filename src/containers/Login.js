import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Cookies from 'universal-cookie';

import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {Button, Link} from "@material-ui/core";

import FormTextField from "../components/form/FormTextField";
import {logIn, disconnect} from "../actions/authentication";

/**
 * This class contain a form to allow a connexion thanks to a password and pseudo or mail given in TextField
 * the action 'logIn' is used to get information about user if we found it in database
 */
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false
        };
    }

    handleSubmit = async (values) => {
        let request = await this.props.logIn(values);
        if (this.props.auth) {
            
        }
    };

    disconnection = async () => {
        this.props.disconnect()
    };

    render() {
        const array = [
            {name: "phoneNumber", label: "Phone", type: "text"}
        ];
        const cookies = new Cookies();
        let cookie = cookies.get('userCookie') ? cookies.get('userCookie') : "";
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
                            login: "",
                        }} 
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object({
                            phoneNumber: Yup.string().required("Champs requis")
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
    connect( mapStateToProps, {logIn, disconnect} )(Login)
    );
