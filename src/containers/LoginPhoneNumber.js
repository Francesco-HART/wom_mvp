import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {Button, Grid, Link, Typography} from "@material-ui/core";
import es from 'react-phone-input-2/lang/es.json'
import startsWith from 'lodash.startswith';
import validator from 'validator';
import {getUserByPhoneNumber} from "../actions/authentication";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class InputPhoneNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: "",
            isValidPhoneNumber: false
        };
    }

    handleOnChange = (value) => {
        this.setState({
            phone: value,
            isValidPhoneNumber: validator.isMobilePhone(value)
        });
    };

    verifIsValid = async () => {
        await this.props.getUserByPhoneNumber(this.state.phone);
    };

    render() {
        return (
            <Grid container justify='center' spacing={5}>
                <Grid item xs={12}>
                    <Grid container justify='center' spacing={5}>
                        <Grid item >
                            <PhoneInput
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true
                                }}
                                placeholder={'+33612345678'}
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
                        <Grid item>
                            <Button disabled={!this.state.isValidPhoneNumber} variant="contained" onClick={this.verifIsValid}>
                                Valider
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/signin">
                                <Typography variant={'body2'}>Toujours pas inscrit ?</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(
    connect(mapStateToProps, {getUserByPhoneNumber})(InputPhoneNumber)
);