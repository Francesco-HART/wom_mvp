import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Cookies from 'universal-cookie';
import FormPhoneNumber from "../components/form/FormPhoneNumber";
import {Button, Grid, Typography} from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';

import {findUserByPhoneNumber, disconnect} from "../actions/authentication";

/**
 * This class contain a form to allow a connexion thanks to a password and pseudo or mail given in TextField
 * the action 'logIn' is used to get information about user if we found it in database
 */
class Login extends React.Component {

    handleSubmit = async (values) => {
        const query = await this.props.findUserByPhoneNumber(values["phoneNumber"]);
        if (query != null) {
            console.log("j'ai trouvé mon user");
        } else {
            console.log("je n'ai pas trouvé mon user");
        }
    };

    render() {
        const array = [
            {name: "phoneNumber", label: "Phone", type: "text"}
        ];
        const cookies = new Cookies();
        let cookie = cookies.get('userCookie') ? cookies.get('userCookie') : "";
        return (
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify='center' spacing={2}>
                        <Grid item>
                            <LockOpenIcon/>
                        </Grid>
                        <Grid item>
                            <Typography>Connexion</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <FormPhoneNumber  arrayField={array}/>
                </Grid>

                <Grid item xs={12} container justify='center' spacing={2}>
                    <Typography item>
                        Pas encore inscrit ?
                    </Typography>
                </Grid>
                <Grid item xs={12} container justify='center' spacing={2}>
                    <Button variant="contained" color="primary" href="/signin">
                        M'inscrire
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default withRouter(
    connect(mapStateToProps, {findUserByPhoneNumber, disconnect})(Login)
);
