import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NotAvailable extends React.Component {

    render() {
        return (
            <Grid container spacing={5} style={{marginTop: 20}}>
                <Grid item xs={12} style={{marginTop: 80}}>
                    <Grid container justify='center'>
                        <Grid item >
                            <Typography>
                                Ce coupon n'est plus disponible :(
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
        