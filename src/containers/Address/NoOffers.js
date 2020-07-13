import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NoOffers extends React.Component {

    render() {
        return (
            <Grid container xs={12} spacing={5}>
                <Grid item>
                    <Grid container xs={12} spacing={5}>
                        <Grid item>
                            <Typography variant="h2">
                                {this.props.addressName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} spacing={5} justify="center">
                        <Grid item>
                            <Typography variant="h5">
                                Toutes les offres quotidienne ont déjà été distribué. Mais pas de souci, reviens demain !
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
        