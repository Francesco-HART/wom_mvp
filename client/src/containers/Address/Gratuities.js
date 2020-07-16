import React from 'react';
import {Grid, Typography, Button, CardActionArea, CardMedia, Box} from '@material-ui/core';

export default class Gratuities extends React.Component {

    render() {

        const {classes} = this.props

        return (
            <Grid container direction="column" justify="space-between" spacing={4}>

                <Grid item xs={12} className={classes.stapeTitleContribution}>                  
                            <Typography variant="h5" style={{fontFamily : 'Archivo Black'}}>
                                Etape 2 : Choisis ton cadeau
                            </Typography>
                </Grid>

            
                <Grid item >
                    <Grid container justify='center' spacing={4} direction='column' alignItems='center'>
                    {
                        this.props.offers.map((value, id) => (
                            <>
                            <Box border={5} borderColor="white" borderRadius={30}>
                                <Grid item xs={12} sm={4} key={id}>
                                    <CardActionArea style={{backgroundImage:`url('https://assets.afcdn.com/recipe/20160826/47100_w1024h768c1cx1500cy1000.jpg'})`}} className={classes.mediaContainerGratuities} onClick={ () => this.props.selectionOffer(id)} component="button" >
                                        <CardMedia  className={classes.mediaContainerGratuities} image='https://assets.afcdn.com/recipe/20160826/47100_w1024h768c1cx1500cy1000.jpg'/>
                                    </CardActionArea>
                                </Grid>
                            </Box>

                                <Grid item xs={12}>
                                    <Button  onClick={() => this.props.selectionOffer(id)}>  <Typography variant='h5' style={{fontFamily : 'Archivo Black'}}> {value} </Typography></Button>
                                </Grid>
                            </>
                        ))
                    }
                </Grid>
            </Grid>

                <Grid item >
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Typography variant="h5" style={{fontFamily : 'Archivo Black'}} >
                                2 / 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
