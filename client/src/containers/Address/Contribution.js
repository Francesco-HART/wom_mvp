import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography, Button, Card, CardActions, CardContent,CardActionArea,  CardMedia} from '@material-ui/core';

//imgs
import ShoppingCall from '../../img/ShoppingCall.png'
import CoffeCall from '../../img/CoffeCall.png'

const useStyles = makeStyles((theme = 'light') => ({
    root: {
        width: 300,
        height: '100%',
        margin:10
    },
    mediaContainer : {
        background : 'white',
        height : 300,
        width : 300, 
        borderRadius : 10
    },
    media: {
        width : '100%',
        height : '100%',
        paddingTop: '50%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

 const Contribution = ({addressName, selectionContribution }) =>  {
    const classes = useStyles()
  
        return (
            <Grid container direction="column" justify="space-between" spacing={4}>
                <Grid item>
                    <Grid container>
                        <Grid item >
                            <Typography variant="h2">
                                {addressName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item >
                            <Typography variant="h5">
                                Etape 3 : Je choisis mon geste
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center' >
                        <Grid item >
                            <Typography variant='h5'>
                                Ma contribution :
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center' spacing={5}>

                        <Grid item>
                            <Grid container justify = 'center' direction='column' alignItems='center'>
                                <Grid item>
                                    <CardActionArea  className={classes.mediaContainer} onClick={ () => selectionContribution("Avec mes amis")} component="button" >
                                        <CardMedia  className={classes.media} image={CoffeCall}/>
                                    </CardActionArea>
                                </Grid>
                                <Grid item>
                                    <Button  onClick={() => selectionContribution("Avec mes amis")}>  <Typography variant='h6'> Tu es accompagné </Typography></Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                           
                        <Grid item>
                            <Grid container justify = 'center' direction='column' alignItems='center'>
                                <Grid item>
                                    <CardActionArea  className={classes.mediaContainer} onClick={ () => selectionContribution("Seul")} component="button" >
                                        <CardMedia  className={classes.media} image={ShoppingCall}/>
                                    </CardActionArea>
                                </Grid>
                                 <Grid item>
                                    <Button onClick={() => selectionContribution("Seul")}> <Typography variant='h6'> Un petit truc en + </Typography></Button>
                                 </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item >
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Typography variant="h5" >
                                3 / 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    
}
export default Contribution