import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import LoginPhoneNumber from '../../containers/LoginPhoneNumber';

export default class Authentication extends React.Component {
    
    render() {
        return (
            <Grid container direction='column' justify='space-around' spacing={10}>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Typography variant="h2">
                                {this.props.addressName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify="flex-start">
                        <Grid item >
                            <Typography variant="h4">
                                Etape 1 : Je m'identifie
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify='center'>
                        <Grid item>
                            <LoginPhoneNumber getUserByPhoneNumber={this.props.getUserByPhoneNumber}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Typography variant="h5" >
                                1 / 4
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}