import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import {addUser} from "../actions/updateFirestoreData/userData/user"
import InscritionForm from "../components/form/InscritionForm";


/**
 * This class contain a form to sigIn thanks to a password, pseudo and mail input in TextField
 * the action 'sigIn' is used to add information about user if pseudo or mail isn't in database
 */
class Inscription extends React.Component {

    handleSubmit = async values => {
        await this.props.addUser(values);
    };

    render() {
        const array = [
            {name: "phone_number", label: "Numero de téléphone", type: "email"}
        ];

        return (
            <Formik initialValues={{phone_number: ""}} onSubmit={this.handleSubmit}
                    validationSchema={Yup.object({
                        phone_number: Yup.number().required("Champ requis"),
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
    {addUser}
)(Inscription))
