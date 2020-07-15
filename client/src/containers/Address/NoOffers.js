import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NoOffers extends React.Component {

    render() {
        return (
            <Grid container direction='column' spacing={10}>
                <Grid item>
                    <Grid container>
                        <Grid item >
                            <Typography variant="h2">
                                {this.props.addressName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center'>
                        <Grid item >
                            <Typography variant='h5'>
                                Toutes les gratuités quotidiennes ont été consommé :(
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center'>
                        <Grid item >
                            <Typography variant='h5'>
                                Reviens demain pour en profiter avec tes amis !
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
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
        