import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
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
        randomValue: null, randomConfirm: null, attempt: 3
    }
    componentDidMount = async () => {
        if (this.props.match.params.id) {
            const address = await this.props.findAddressByDocumentId(this.props.match.params.id)
        }
    }

    handleOnChange = (e) => {
        const isValidPhoneNumber = validator.isMobilePhone(e.target.value)
        this.setState({phone: e.target.value, isValidPhoneNumber})
    }

    handleOnChangeCodeConfirm = (e) => {
        this.setState({randomConfirm: e.target.value})
    }

    verifIsValid = async () => {
        if (this.state.isValidPhoneNumber) {
            const user = await this.props.findUserByPhoneNumber(this.state.phone, false)
            if (!user) {
                this.props.history.push('/signin')
            } else {
                let randomValue = Math.random() * (9999 - 1000) + 1000;
                randomValue = Math.trunc(randomValue)
                this.setState({randomValue});
                console.log(randomValue)
            }
        }
    }

    handleSubmit = async () => {
        if (this.state.attempt <= 0) {
            this.props.showSnackbar('Code faux', 'error')
            this.props.history.push('/sigin')
        } else {
            if (Number(this.state.randomConfirm) === Number(this.state.randomValue)) {
                const user = await this.props.findUserByPhoneNumber(this.state.phone, true)
                if (this.props.match.params.id) {
                    this.props.history.push(`/gratuity/${this.props.match.params.id}`)
                } else if (this.props.address) {
                    this.props.history.push(`/gratuity/${this.props.address.documentId}`)
                } else {
                    this.props.history.push(`/home`)
                }
            } else {
                this.props.showSnackbar(this.state.attempt > 1 ? 'Code faux plus que ' + this.state.attempt + ' tentatives' : 'Code faux plus que ' + this.state.attempt +
                    ' tentative', 'error'
                )
                this.setState({attempt: this.state.attempt - 1})
            }
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
                            {this.state.randomValue ?
                                <TextField
                                    type='text'
                                    variant="outlined"
                                    value={this.state.randomConfirm}
                                    onChange={this.handleOnChangeCodeConfirm}
                                /> :
                                <TextField
                                    type='text'
                                    value={this.state.phone}
                                    onChange={this.handleOnChange}
                                    variant="outlined"
                                />}
                        </Grid>

                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <Grid
                        container
                        justify='center'>
                        <Grid item>
                            {this.state.randomValue ?
                                <Button onClick={this.handleSubmit}> Valider le code sms </Button> :
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
