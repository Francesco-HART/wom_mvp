import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Grid, Button, Typography } from '@material-ui/core';

class Home extends React.Component {
    
    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1">
                        Bienvenue sur Wom
                    </Typography>
                    <Button variant="contained"  href="http://womparis.com" style={{height: 50, background : 'white'}} target="_blank">
                        Visitez notre site vitrine !
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(
    connect()(Home)
    );
