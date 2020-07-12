import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class NotFound extends React.Component {

    render() {
        return (
            <Grid container spacing={5}>
                <Grid item justify="center" >
                    <Typography>
                        Aucune adresse associée à cet identifiant !
                    </Typography>
                    <Button variant="contained" color="primary" style={{height: 50}} href="/">
                        Home
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
        