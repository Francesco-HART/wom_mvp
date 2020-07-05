import React from 'react'
import PhoneInput from 'react-phone-input-2'
import {isValidPhoneNumber} from 'react-phone-number-input'
import 'react-phone-input-2/lib/style.css'
import {Button, Grid} from "@material-ui/core";
import es from 'react-phone-input-2/lang/es.json'
import startsWith from 'lodash.startswith';
import validator from 'validator'

export default class FormPhoneNumber extends React.Component {
    state = {
        phone: '',
        canSubmit: false
    }

    handleOnChange = (value) => {
        this.setState({phone: value})
        const isValidPhoneNumber = validator.isMobilePhone(value)

        console.log(isValidPhoneNumber)
        console.log(value)
    }

    verifIsValid = (canSubmit) => {
        this.setState({canSubmit})
    }

    render() {
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
                                isValid={ (inputNumber, country, countries) => {
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
                            <Button type={"submit"}>Valider</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
