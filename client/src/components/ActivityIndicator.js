import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core';

export default class ActivityIndicator extends React.Component {

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <CircularProgress />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
