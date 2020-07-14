import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NotFound extends React.Component {

    render() {
        return (
            <Grid container spacing={5} style={{marginTop: 100}}>
                <Grid item xs={12}>
                    <Grid container justify='center'>
                        <Grid item >
                            <Typography>
                                Aucun coupon associé à cet identifiant !
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item item xs={12}>
                    <Grid container justify='center'>
                        <Grid item >
                            <Button variant="contained" color="primary" style={{height: 50}} href="/">
                                Home
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
        