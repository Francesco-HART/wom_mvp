import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NoOffers extends React.Component {

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h2">
                        {this.props.addressName}
                    </Typography>
                    <Typography variant="h5">
                        Toutes les offres quotidienne offertes. Mais pas de souci, revenez demain !
                    </Typography>
                    <Button variant="contained" color="primary" href="/">
                        Home
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
        