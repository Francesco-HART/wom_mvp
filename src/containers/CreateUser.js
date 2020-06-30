import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import {createUser} from '../actions/updateFirestoreData/userData/createUser'
import InscritionForm from "../components/form/InscritionForm";


/**
 * This class contain a form to sigIn thanks to a password, pseudo and mail input in TextField
 * the action 'sigIn' is used to add information about user if pseudo or mail isn't in database
 */
class CreateUser extends React.Component {

    handleSubmit =  async values => {
        if (this.props.auth.type === "admin")
            await this.props.createUser(values);
    };

    render(){
        const array = [
            {name: "email", label:"Email", type:"email"},
            {name: "pseudo", label:"Pseudo", type:"text"},
            {name: "type", label:"Type", type:"text"},
        ];

        return(
            <Formik initialValues={{email :"", pseudo :"", password : "", type : ""}} onSubmit={this.handleSubmit}
                    validationSchema={Yup.object({
                        pseudo: Yup.string().required("Champ requis"),
                        email: Yup.string().email("format invalide").required("Champ requis"),
                        password: Yup.string().required("Champ requis")
                            .matches(
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                "8 caractères minimum, dont au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
                            ),
                        confirm_password: Yup.string().required("Champ requis").oneOf(
                            [Yup.ref("password"), null],
                            "Ne correspond pas au mot de passe"
                        ),
                    })}>
                {props => <InscritionForm {...props} arrayField={array}/>}
            </Formik>
        );
    }
}


const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(connect(
    mapStateToProps,
    {createUser}
)(CreateUser))
