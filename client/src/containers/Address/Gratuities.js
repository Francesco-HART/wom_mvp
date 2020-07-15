import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class Gratuities extends React.Component {

    render() {
        return (
            <Grid container direction="column" justify="space-between" spacing={4}>
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
                    <Grid container>
                        <Grid item >
                            <Typography variant="h5">
                                Etape 2 : Choisis ton cadeau
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center' >
                        <Grid item >
                            <Typography variant='h5'>
                                Offre{this.props.offers.length > 1 ? "s" : ""} restante{this.props.offers.length > 1 ? "s" : ""} :
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    this.props.offers.map((value, id) => (
                        <Grid item key={id}>
                            <Grid container justify='center'>
                                <Grid item>
                                    <Button variant="contained" color="primary" style={{height: 50}} onClick={() => this.props.selectionOffer(id)}>
                                        {value}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                }
                <Grid item >
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Typography variant="h5" >
                                2 / 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
