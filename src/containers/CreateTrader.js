import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import {createTrader} from '../actions/updateFirestoreData/userData/createTrader';
import {showSnackbar} from "../actions/snackbar";
import FormCreateTrader from "../components/form/FormCreateTrader";


/**
 * This class contain a form to sigIn thanks to a password, pseudo and mail input in TextField
 * the action 'sigIn' is used to add information about user if pseudo or mail isn't in database
 */
class CreateTrader extends React.Component {

    state = {
        address_lat: null,
        address_lng: null,
    };

    confirmAddress = (lat, lng) => {
        this.setState({
            address_lat: lat,
            address_lng: lng
        });
    };


    handleSubmit = async (values) => {
        const trader_info = values;
        trader_info['localization'] = [Number(this.state.address_lat), Number(this.state.address_lng)];
        trader_info['products'] = [values.free_prod1, values.free_prod2, values.free_prod3]
        await this.props.createTrader(trader_info);
    };

    render() {


        const infoField = [
            {name: "name", label: "Nom du lieu", type: "text"},
            {name: "email", label: "Email", type: "text"},
            {name: "sms", label: "Numero de tel", type: "text"},
            {name: "adresse", label: "Adresse", type: "text"},
            {name: "postal_code", label: "Code postal", type: "text"},
            {name: "free_prod1", label: "Produit gratuit 1", type: "text"},
            {name: "free_prod2", label: "Produit gratuit 1", type: "text"},
            {name: "free_prod3", label: "Produit gratuit 1", type: "text"},
        ];

        const dates = [
            {name: "date_start", label: "Date de début"},
            {name: "date_end", label: "Date de fin"},
        ];

        return (
            <>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        sms: "",
                        adress: "",
                        isActive : false,
                        postal_code: "",
                        free_prod1: "",
                        free_prod2: "",
                        free_prod3: "",
                        description: "",
                        date_end: '',
                        date_start: ''
                    }}
                    validationSchema={
                        Yup.object({
                            name: Yup.string().required("Champ requis"),
                            email: Yup.string().email("format invalide").required("Champ requis"),
                            sms: Yup.string(),
                            address: Yup.string().required("Champ requis"),
                            postal_code: Yup.string().required("Champ requis"),
                            free_prod1: Yup.string().required("Champ requis"),
                            free_prod2: Yup.string().required("Champ requis"),
                            free_prod3: Yup.string().required("Champ requis"),
                            description: Yup.string(),
                            date_start: Yup.date().required("Champ requis"),
                            date_end: Yup.date().required("Champ requis"),
                        })
                    }
                    onSubmit={this.handleSubmit}
                >
                    {props =>
                        <FormCreateTrader
                            {...props}
                            open={this.state.open}
                            openDialog={this.openDialog}
                            confirmAddress={this.confirmAddress}
                            onClose={this.onClose} setDateStart={this.setDateStart} setDateEnd={this.setDateEnd}
                            dateField={dates} arrayField={infoField}
                        />}
                </Formik>
            </>
        );
    }
}


const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(connect(
    mapStateToProps,
    {createTrader, showSnackbar}
)(CreateTrader))
