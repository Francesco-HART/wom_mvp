import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NoOffers extends React.Component {

    render() {
        return (
            <Grid container direction='column' alignItems='center' spacing={10}>
                <Grid item style={{marginTop : 100}}>
                    
                            <Typography variant='h4'>
                                Toutes les gratuités quotidiennes ont été consommé 😥
                            </Typography>
                     
                </Grid>
                <Grid item>
                    
                            <Typography variant='h4'>
                                Reviens demain pour en profiter avec tes amis !
                            </Typography>
                       
                </Grid>
                <Grid item>
                    <Grid container justify='center'>
                        <Grid item >
                            <Button variant="contained"  style={{height: 50, background : 'white'}} href="/">
                                Home
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
        