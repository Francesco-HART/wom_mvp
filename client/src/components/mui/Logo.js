import React from 'react';
import {connect} from "react-redux";
import {makeStyles, Typography, Paper, Grid} from '@material-ui/core';
import LocalDining from "@material-ui/icons/LocalDining";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    title: {fontFamily: 'Sofia', fontSize: '22px'},
    box: {
        backgroundColor: '#ff6f61',
        padding: 10,
    }
}));


/**
 * This function will display a logo as page title, this logo is only made with css, not image
 * @return {*}
 * @constructor
 */
const Logo = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} direction="row" justify="center" alignItems="center">
            <Paper className={classes.box}>
                <Grid container direction="row" justify="center" alignItems="center" item>
                    <LocalDining style={{margin: 'auto'}}/>
                        <Typography variant="body1" className={classes.title}>Wom Paris</Typography>
                    <LocalDining/>
                </Grid>
            </Paper>
        </Grid>
    );
};

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(
    mapStateToProps,
    null
)(Logo)
