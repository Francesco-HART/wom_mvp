import React from 'react';
import {Grid, Typography, Button, IconButton, TextField} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

export default class Validation extends React.Component {

    render() {

        const {classes, confirm, handleChange} = this.props

        return (
            <Grid container justify='center' alignItems='center' spacing={5}>
                <Grid item xs={12}>
                    <Grid container direction="column" justify="space-between" spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{fontFamily: 'Archivo Black'}}>
                                Etape 4 : Validation
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>

                    <Grid container justify='center' alignContent='center' direction='column' alignItems='center'
                          spacing={5}>

                        <Grid item>
                            <Typography variant='h4' style={{fontFamily: 'Archivo Black'}}>
                                BIENTOT FINI
                            </Typography>
                        </Grid>

                        <Grid item xs={12} style={{textAlign: 'center', fontFamily: 'Archivo Black'}}>
                            <Typography variant='h5' 
                                        display="inline">
                                Pour valider ton expérience WOM présente ton
                                écran au serveur en terrasse ou au comptoir.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container justify='center' alignContent='center' spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container justify='center' alignContent='center'>

                                        <Grid item>
                                            <Typography variant='h5'>
                                                {this.props.selectedOffer}
                                                <IconButton alignContent='center' variant="contained"
                                                            onClick={() => this.props.resetSelectedOffer()}>
                                                    <CreateIcon/>
                                                </IconButton>
                                            </Typography>


                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container justify='center'>
                                        <Grid item>
                                            <Typography variant='h5'>
                                               {this.props.contribution}
                                                <IconButton alignContent='center' variant="contained"
                                                            onClick={() => this.props.resetSelectedOffer()}>
                                                    <CreateIcon/>
                                                </IconButton>
                                            </Typography>


                                        </Grid>
                                    </Grid>
                                </Grid>

                                    <Grid item>
                                    <Grid container justify="center" direction="column" spacing={4}>
                                        <Grid item xs={12}>
                                            <TextField
                                                InputProps={ {background: 'white'}}
                                                type='text'
                                                style={{background: 'fff', color: 'fff'}}
                                                color='fff'
                                                onChange={(e) => handleChange(e)} label={'Confirmation'}
                                                InputLabelProps={{shrink: true}} variant="filled"
                                                value={confirm}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container justify="center" spacing={4}>
                                                <Grid item xs={6}>
                                                    <Button variant="contained" style={{color: 'black', background: 'white'}}
                                                            onClick={() => this.props.validation()}>
                                                        Valider
                                                    </Button>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Button variant="contained" color="secondary" onClick={() => this.props.cancel()}>
                                                        Annuler
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


              
                <Grid item xs={12}>
                    <Grid container justify="flex-end">
                        <Grid item className={classes.stapeNumberContribution}>
                            <Typography variant="h5" style={{fontFamily: 'Archivo Black'}}>
                                4 / 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
