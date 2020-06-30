import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Cookies from 'universal-cookie';
import {logIn, disconnect} from "../actions/getFirestoreData/authentication";
import FormTextField from "../components/form/FormTextField";
import Typography from '@material-ui/core/Typography';
import {Button, Link} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";



/**
 * This class contains a link to redirect to Connexion container, and a form to input mail.
 * we will check if it's in database, and we will have to give it
 * maybe later send a mail with the password
 */
class ForgotPassword extends React.Component {
    state = {
        isConnected: false
    };

    handleSubmit = async (values) => {
        let request = await this.props.logIn(values);
        this.setState({isConnected: request})
    };

    disconnection = async () => {
        this.props.disconnect()
    };

    render() {
        const array = [
            {name: "email", label: "Email", type: "text"},
        ];
        const cookies = new Cookies();
        let cookie = cookies.get('userCookie') ? cookies.get('userCookie') : "";

        if (this.props.auth) {
            return (
                <Grid container>
                    <Typography>Vous êtes connecté en tant que {this.props.auth.pseudo} {cookie}</Typography>
                    <Button onClick={this.disconnection}>Se déconnecter</Button>
                </Grid>
            )
        }
        else {
            return (
                <>
                    <Typography align='center' style={{margin : 10}}> Mot de passe oublié? </Typography>
                    <Formik initialValues={{
                        email: '',
                    }} onSubmit={this.handleSubmit}
                            validationSchema={Yup.object({
                                email: Yup.string().email("format invalide").required("Champ requis"),
                            })}>
                        {props => <FormTextField {...props} arrayField={array}/>}
                    </Formik>

                    <Link href="/connexion">
                        <Typography variant={'body2'} align='center' style={{margin : 10}}>Déjà inscrit? connectez vous  </Typography>
                    </Link>
                </>
            )
        }
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(connect(
    mapStateToProps,
    {logIn, disconnect}
)(ForgotPassword))
