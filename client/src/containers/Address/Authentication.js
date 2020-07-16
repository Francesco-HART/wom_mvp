import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import LoginPhoneNumber from '../../containers/LoginPhoneNumber';

export default class Authentication extends React.Component {
    
    render() {

        const {classes} = this.props

        return (
            <Grid container direction='column' justify='center' spacing={2}>
            
                        <Grid item xs={12} className={classes.stapeTitle} >
                            <Typography variant="h5" style={{fontFamily : 'Archivo Black'}}>
                                Etape 1 : Enregistre-toi
                            </Typography>
                        </Grid>

                <Grid item>
                    <Grid container justify='center'>
                        <Grid item xs={12}>
                            <LoginPhoneNumber getUserByPhoneNumber={this.props.getUserByPhoneNumber}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h5' align='center'>{this.props.offers.length > 1 ? `Offre disponible aujourd'hui : ${this.props.offers.length} restantes` : `Offre disponible aujourd'hui : ${this.props.offers.length} restante`}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Typography variant="h5" className={classes.stapeNumber} style={{fontFamily : 'Archivo Black'}} >
                                1 / 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}