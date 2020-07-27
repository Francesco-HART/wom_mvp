import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class Validation extends React.Component {

    render() {

        const {classes} = this.props

        return (
            <Grid container justify='center' alignItems='center' spacing={5}>
                <Grid item xs={12}>
                    <Grid container direction="column" justify="space-between" spacing={4}>
                        <Grid item xs={12} >            
                                        <Typography variant="h5" style={{fontFamily : 'Archivo Black'}}>
                                            Etape 4 : Validation
                                        </Typography>                     
                        </Grid>
                    </Grid>
                </Grid>
                    <Grid item  xs={12}>      

                        <Grid container justify='center' alignContent='center' direction='column' alignItems='center' spacing={5}>

                            <Grid item >
                                        <Typography variant='h4' style={{fontFamily : 'Archivo Black'}}>
                                            BIENTOT FINI
                                        </Typography>               
                            </Grid>

                            <Grid item xs={12}>
                                        <Typography  variant='h5' style={{ textAlign : 'center'  ,fontFamily : 'Archivo Black'}} display="inline">
                                            Pour valider ton expérience WOM présente ton
                                            écran au serveur en terrasse ou au comptoir.
                                        </Typography>               
                            </Grid>

                            <Grid item>
                                        <Typography variant='h5'>
                                            J'ai choisi : {this.props.selectedOffer}
                                        </Typography>               
                            </Grid>
                        
                            <Grid item>                  
                                        <Typography variant='h5' >
                                            Je suis : {this.props.contribution}
                                        </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>

                        <Grid container  justify='center' alignContent='center' direction='column' alignItems='center'spacing={2}>
                    
                            <Grid item xs={12}>
                                <Button alignContent='center' variant="contained"  style={{height: 50}} onClick={() => this.props.resetSelectedOffer()}>
                                    Changer ma gratuité
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="contained" style={{height: 50}} onClick={() => this.props.resetContribution()}>
                                    Je ne suis pas {this.props.contribution}
                                </Button>
                            </Grid>

                            <Grid item xs={6}>
                                <Button variant="contained"  style={{height: 50}} onClick={() => this.props.validation()}>
                                    Valider
                                </Button>
                            </Grid>

                            <Grid item xs={6}>
                                <Button variant="contained" color="secondary" style={{height: 50}} onClick={() => this.props.cancel()}>
                                    Annuler
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="flex-end">
                            <Grid item className={classes.stapeNumberContribution}>
                                <Typography variant="h5" style={{fontFamily : 'Archivo Black'}} >
                                    4 / 4
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
            </Grid>
        );
    }
}
