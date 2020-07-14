import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NotFound extends React.Component {

    render() {
        return (
            <Grid container xs={12} spacing={5} justify='center'>
                <Grid item justify="center" >
                    <Typography>
                        Aucun coupon associé à cet identifiant !
                    </Typography>
                    <Button variant="contained" color="primary" style={{height: 50}} href="/">
                        Home
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
        