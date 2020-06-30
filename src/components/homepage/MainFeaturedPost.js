import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, Paper, Typography, Grid, Link} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://www.tourdumonde.fr/wordpress/wp-content/uploads/pizza3.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
            paddingRight: 0,
        },
    },
}));


/**
 * This function is used to display an image with some text over it as our main post seen on Home
 * @param props {object} : props, contains information like title, description and image's url
 * @return {*}
 * @constructor
 */
export default function MainFeaturedPost(props) {
    const classes = useStyles();
    const {post} = props;

    return (
        <Paper className={classes.mainFeaturedPost} style={{backgroundImage: `url(${post.image})`}}>
            {/* Increase the priority of the hero background image */}
            {<img style={{display: 'none'}} src={post.image} alt={post.imageText}/>}
            <div className={classes.overlay}/>
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {post.description}
                        </Typography>
                        { !props.auth && <Link variant="subtitle1" href="/connexion">
                            {post.linkText}
                        </Link>}
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
};
