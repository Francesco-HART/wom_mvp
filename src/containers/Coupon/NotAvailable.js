import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NotAvailable extends React.Component {

    render() {
        return (
            <Grid container xs={12} spacing={5}>
                <Grid item>
                    <Grid container xs={12} spacing={5}>
                        <Grid item>
                            <Typography variant="h2">
                                Ce coupon n'est plus disponible !
                            </Typography>
                        </Grid>
                    </Grid>
                    
                    <Grid container xs={12} spacing={5} justify="center">
                        <Grid item>
                            <Button variant="contained" color="primary" href="/">
                                Home
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
        