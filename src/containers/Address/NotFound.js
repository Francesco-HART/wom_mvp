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
                                Aucune adresse associée à cet identifiant !
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
