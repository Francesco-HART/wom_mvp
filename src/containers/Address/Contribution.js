import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';

export default class Contribution extends React.Component {

    render() {
        return (
            <Grid container direction="column" justify="space-between" spacing={10}>
                <Grid item>
                    <Grid container>
                        <Grid item >
                            <Typography variant="h2">
                                {this.props.addressName}
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
                            <Button variant="contained" color="primary" style={{width: 200, height: 200}} onClick={() => this.props.selectionContribution("Seul")}>
                                Seul
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" style={{width: 200, height: 200}} onClick={() => this.props.selectionContribution("Avec mes amis")}>
                                Avec mes amis
                            </Button>
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
}
