import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NotFound extends React.Component {

    render() {
        return (
            <Grid container direction='column' spacing={10}>
                <Grid item />
                <Grid item>
                    <Grid container justify='center'>
                        <Grid item>
                            <Typography variant='h5'>
                                Vous ne pouvez créer plus de {this.props.numberAddressCanCreate} adresse{this.props.numberAddressCanCreate > 1 ? "s" : ""} !
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center'>
                        <Grid item>
                            <Typography variant='h5'>
                                Souscrivez une nouvelle adresse à Wom pour pouvoir en créer d'avantage !
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center'>
                        <Grid item>
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
