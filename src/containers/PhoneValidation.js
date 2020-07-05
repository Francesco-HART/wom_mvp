import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import es from 'react-phone-input-2/lang/es.json'
import startsWith from 'lodash.startswith';
import {Button, Grid, TextField} from "@material-ui/core";
import {findUserByPhoneNumber, disconnect} from "../actions/authentication";
import {findAddressByDocumentId} from "../actions/address";
import {showSnackbar} from "../actions/snackbar";
import validator from "validator";

/**
 * This class contain a form to allow a connexion thanks to a password and pseudo or mail given in TextField
 * the action 'logIn' is used to get information about user if we found it in database
 */
class PhoneValidation extends React.Component {

    state = {
        phone: '',
        isValidPhoneNumber: false,
        randomValue: null, randomConfirm: null, phoneNumber: null
    }
    componentDidMount = async () => {
        if (this.props.match.params.id) {
            const address = await this.props.findAddressByDocumentId(this.props.match.params.id)
        }
    }

    handleOnChange = (value) => {
        const isValidPhoneNumber = validator.isMobilePhone(value)
        this.setState({phone: value, isValidPhoneNumber})
    }

    verifIsValid = async () => {
        if (this.state.isValidPhoneNumber) {
            const user = await this.props.findUserByPhoneNumber(this.state.phone, false)
            if (!user) {
                this.props.history.push('/signin')
            } else {
                const randomConfirm = Math.random() * (9999 - 1000) + 1000;
                this.setState({randomConfirm})
            }
        }
    }

    handleSubmit = async () => {
        if (this.state.randomConfirm === this.state.randomValue) {
            const user = await this.props.findUserByPhoneNumber(this.state.phone, true)
            if (this.props.match.params.id) {
                await this.props.history.push(`/gratuity/${this.props.match.params.id}`)
            } else {
                await this.props.history.push(`/gratuity/${this.props.address.documentId}`)
            }
        } else {
            this.props.showSnackbar('Code faux', 'success')
        }
    };

    render() {
        const {isValidPhoneNumber} = this.state
        return (
            <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={2}>
                    <Grid
                        container
                        justify='center'>
                        <Grid item>
                            {this.state.randomConfirm ? <TextField onChange={this.handleOnChange}/> :
                                <PhoneInput
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true
                                }}
                                country={'fr'}
                                value={this.state.phone}
                                onChange={this.handleOnChange}
                                localization={es}
                                isValid={(inputNumber, country, countries) => {
                                    return countries.some((country) => {
                                        return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                                    });
                                }}
                            />}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <Grid
                        container
                        justify='center'>
                        <Grid item>
                            {this.props.randomConfirm ? <Button onClick={this.handleSubmit}> Confirmer </Button> :
                                <Button disabled={!isValidPhoneNumber} type={"button"}
                                        onClick={this.verifIsValid}>Valider</Button>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({auth, address}) => {
    return {auth, address}
};

export default withRouter(
    connect(mapStateToProps, {
        findUserByPhoneNumber,
        findAddressByDocumentId,
        showSnackbar,
        disconnect
    })(PhoneValidation)
);
