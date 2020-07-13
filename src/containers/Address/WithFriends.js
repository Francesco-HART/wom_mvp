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
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        <Grid item>
                            <Button variant="contained" color="primary" style={{height: 50}}
                                onClick={() => this.props.selectionWithFriends("Seul")}>
                                Seul
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" style={{height: 50}}
                                onClick={() => this.props.selectionWithFriends("Avec mes amis")}>
                                Avec mes amis
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
