import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class Gratuities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Offres restantes :
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        {this.props.offers.map((value, id) => (
                            <Grid key={id} item>
                                <Button variant="contained" color="primary" style={{height: 50}}
                                        onClick={() => this.props.selectionOffer(id)}>
                                    {value}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
