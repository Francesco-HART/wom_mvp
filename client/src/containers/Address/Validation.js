import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class Validation extends React.Component {

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
                            <Typography variant="h4">
                                Etape 4 : Je confirme
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center' direction='column' alignItems='center'>
                        <Grid item >
                            <Typography variant='h5'>
                                J'ai choisi : {this.props.selectedOffer}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center' >
                        <Grid item >
                            <Typography variant='h5'>
                                Je suis : {this.props.contribution}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center' spacing={5}>
                        <Grid item>
                            <Button variant="contained" color="primary" style={{height: 50}} onClick={() => this.props.validation()}>
                                Valider
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained"  style={{height: 50}} onClick={() => this.props.resetSelectedOffer()}>
                                Changer ma gratuité
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" style={{height: 50}} onClick={() => this.props.resetContribution()}>
                                Je ne suis pas {this.props.contribution}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" style={{height: 50}} onClick={() => this.props.cancel()}>
                                Annuler
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item >
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Typography variant="h5" >
                                4 / 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
