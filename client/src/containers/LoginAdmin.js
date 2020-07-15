import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Formik} from "formik";
import * as Yup from "yup";
import FormTextField from "../components/form/FormTextField";
import {getUserByUsernameAndPassword, disconnect} from "../actions/authentication";
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';
import {withRouter} from "react-router-dom";
import {Link} from "@material-ui/core";
import Cookies from 'universal-cookie';
import LockOpenIcon from '@material-ui/icons/LockOpen';


/**
 * This class contain a form to allow a connexion thanks to a password and pseudo or mail given in TextField
 * the action 'logIn' is used to get information about user if we found it in database
 */
class LoginAdmin extends React.Component {

    handleSubmit = async (values) => {
        if (await this.props.getUserByUsernameAndPassword(values.login, values.password)) {
            this.props.history.push("/");
        }
    };

    disconnection = async () => {
        this.props.disconnect()
    };

    render() {
        //console.log(this.props)
        const array = [
            {name: "login", label: "Pseudo", type: "text"},
            {name: "password", label: "Mot de passe", type: "password"}
        ];
        //const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
        const cookies = new Cookies();
        let cookie = cookies.get('userCookie') ? cookies.get('userCookie') : "";
            return (
                <>
                    <Grid container justify='center' spacing={2}>
                        <Grid item>
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
                            login: cookie,
                            password: cookies.get('userPassCookie') ? cookies.get('userPassCookie') : ""
                        }} 
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object({
                            login: Yup.string().required("Champs requis"),
                            password: Yup.string().required("Champs requis")
                        })}
                    >
                        {props => <FormTextField {...props} arrayField={array}/>}
                    </Formik>

                    <Grid container justify='center' spacing={4}>
                        <Grid item>
                            <Link href="/profil/motdepasse">
                                <Typography variant={'body2'}>Mot de passe oublié ?</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signin">
                                <Typography variant={'body2'}>Toujours pas inscrit ?</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </>
            )
        }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(
    connect(mapStateToProps, {getUserByUsernameAndPassword, disconnect})(LoginAdmin)
);
