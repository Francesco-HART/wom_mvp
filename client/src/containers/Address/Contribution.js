import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography, Button ,CardActionArea,  CardMedia} from '@material-ui/core';

//imgs
import ShoppingCall from '../../img/ShoppingCall.png'
import CoffeCall from '../../img/CoffeCall.png'


 const Contribution = ({ selectionContribution, classes }) =>  {
  
        return (
            <Grid container direction="column" justify="space-between" spacing={4}>
                       <Grid xs={12} item className={classes.stapeTitleContribution} >
                            <Typography variant="h5" style={{fontFamily : 'Archivo Black'}}>
                                Etape 3 : Choisis ton geste
                            </Typography>
                </Grid>
              
                <Grid item>
                    <Grid container justify='center' spacing={5}>

                        <Grid item xs={12} sm={6}>
                            <Grid container justify = 'center' direction='column' alignItems='center'>
                                <Grid item>
                                    <CardActionArea  className={classes.mediaContainerContribution} onClick={ () => selectionContribution("Avec mes amis")} component="button" >
                                        <CardMedia  className={classes.mediaContribution} image={CoffeCall}/>
                                    </CardActionArea>
                                </Grid>
                                <Grid item>
                                    <Button  onClick={() => selectionContribution("Avec mes amis")}>  <Typography variant='h5' style={{fontFamily : 'Archivo Black'}}> Tu es accompagné </Typography></Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                           
                        <Grid item xs={12} sm={6}>
                            <Grid container justify = 'center' direction='column' alignItems='center'>
                                <Grid item>
                                    <CardActionArea  className={classes.mediaContainerContribution} onClick={ () => selectionContribution("Seul")} component="button" >
                                        <CardMedia  className={classes.mediaContribution} image={ShoppingCall}/>
                                    </CardActionArea>
                                </Grid>
                                 <Grid item>
                                    <Button onClick={() => selectionContribution("Seul")}> <Typography variant='h5' style={{fontFamily : 'Archivo Black'}}> Un petit truc en + </Typography></Button>
                                 </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item >
                    <Grid container justify="flex-end">
                        <Grid item className={classes.stapeTitleContribution}>
                            <Typography variant="h5" style={{fontFamily : 'Archivo Black'}} >
                                3 / 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    
}
export default Contribution