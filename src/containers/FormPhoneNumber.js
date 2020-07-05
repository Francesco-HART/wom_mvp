import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {Button, Grid} from "@material-ui/core";
import es from 'react-phone-input-2/lang/es.json'
import startsWith from 'lodash.startswith';
import validator from 'validator'
import {disconnect, findUserByPhoneNumber, isUserAlreadyExists} from "../actions/authentication";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


class FormPhoneNumber extends React.Component {
    state = {
        phone: '',
        isValidPhoneNumber: false
    }

    handleOnChange = (value) => {
        const isValidPhoneNumber = validator.isMobilePhone(value)
        console.log(value)
        this.setState({phone: value, isValidPhoneNumber})

    }

    verifIsValid = async () => {

        if (this.state.isValidPhoneNumber) {
            const user = await this.props.findUserByPhoneNumber(this.state.phone)
            if (!user) {
                this.props.history.push('/signin')
            } else {
                const addressId = this.props.match.params.id
                this.props.history.push(`/gratuity/${this.props.match.params.id}`)
            }
        }
    }

    render() {
        const {isValidPhoneNumber} = this.state
        return (
            <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={2}>
                    <Grid
                        container
                        justify='center'>
                        <Grid item>
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
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <Grid
                        container
                        justify='center'>
                        <Grid item>
                            {this.props.randomConfirm && <Button disabled={!isValidPhoneNumber} type={"button"}
                                                                 onClick={this.verifIsValid}>Valider</Button>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}


export default withRouter(
    connect(null, {findUserByPhoneNumber, disconnect})(FormPhoneNumber)
);