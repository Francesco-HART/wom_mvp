import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography, Divider} from '@material-ui/core';


/**
 * This function will display our aim and our path
 * @param props {object} : props, contains the title of this section
 * @return {*}
 * @constructor
 */
export default function Main(props) {
    const {title} = props;

    return (
        <Grid item xs={12} md={8}>

        </Grid>
    );
}

Main.propTypes = {
    posts: PropTypes.array,
    title: PropTypes.string,
};
