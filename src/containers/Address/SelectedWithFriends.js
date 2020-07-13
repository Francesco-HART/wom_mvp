import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class SelectedGratuity extends React.Component {

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Je suis :
                    </Typography>
                    <Button variant="contained" color="primary" style={{height: 50}}>
                        {this.props.withFriends}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={this.props.hasValidate} variant="contained" style={{height: 50}} onClick={this.props.resetWithFriends}>
                        Je ne suis pas {this.props.withFriends}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
