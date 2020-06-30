import React from 'react';
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import {updateAccount} from "../actions/updateFirestoreData/userData/updateAccount";
import UpdateUserForm from "../components/form/UpdateUserForm";
import UpdateOwnPasswordForm from "../components/form/UpdateOwnPasswordForm";
import {LinearProgress, Grid} from "@material-ui/core";


/**
 * This class contain a form to allow update user's data like mail, pseudo or password.
 * the left form is for user current data (to check if it's really him)
 * the right form is for the new user's information if we found it in database that will be update
 */
class UpdateAccount extends React.Component {
    state = {
        isLoading: false
    };

    handleSubmit = async (values) => {
        await this.props.updateAccount(values, this.props.auth);
        this.setState({isLoading: true})
    };


    render() {
        if (!this.props.auth) return <LinearProgress/>

        const array = [
            {name: "pseudo", label: "Pseudo", type: "text"},
            {name: "email", label: "Email", type: "text"},
        ];

        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Formik initialValues={{
                        pseudo: this.props.auth.pseudo,
                        email: this.props.auth.email,
                        password: this.props.auth.password
                    }} onSubmit={this.handleSubmit}
                            validationSchema={Yup.object({
                                pseudo: Yup.string(),
                                email: Yup.string(),
                            })}>
                        {props => <UpdateUserForm {...props} arrayField={array}/>}
                    </Formik>
                </Grid>

                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            pseudo: this.props.auth.pseudo,
                            email: this.props.auth.email,
                            current_password: "",
                            password: "",
                            confirm_password: "",
                        }}
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object({
                            current_password: Yup.string().required("Champ requis"),
                            password: Yup.string().required("Champ requis").matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    "8 caractères minimum, dont au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
                                ),
                            confirm_password: Yup.string().required("Champ requis").oneOf(
                                    [Yup.ref("password"), null],
                                    "Ne correspond pas au champ ci-dessus"
                                ),
                        })}
                    >
                        {(props) => (
                            <form onSubmit={props.handleSubmit}>
                                <UpdateOwnPasswordForm {...props} />
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(
    mapStateToProps,
    {updateAccount}
)(UpdateAccount)
