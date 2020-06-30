import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, Grid, Typography, Link} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
    },
    sidebarAboutBox: {
        padding: theme.spacing(2),
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
}));


/**
 * This function is used to displayed a sidebar with our sponsors
 * @param props {object} : props, contains partners data, description and title of this sidebar
 * @return {*}
 * @constructor
 */
export default function Sidebar(props) {
    const classes = useStyles();
    const {archives, description, title} = props;

    return (
        <Grid item xs={12} md={4}>
            <Card  classes={classes.card}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>{title}</Typography>
                    <Typography>{description}</Typography>
                </CardContent>
            </Card>
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Nos partenaires
            </Typography>
            {archives.map((archive) => (
                <Link display="block" target="_blank" variant="body1" href={archive.url} key={archive.title}>
                    {archive.title}
                </Link>
            ))}
            {/*<Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                    Social
                </Typography>
                social.map((network) => (
                    <Link display="block" variant="body1" href="#" key={network}>
                        <Grid container direction="row" spacing={1} alignItems="center">
                            <Grid item>
                                <network.icon/>
                            </Grid>
                            <Grid item>{network.name}</Grid>
                        </Grid>
                    </Link>
                ))}*/}
        </Grid>
    );
}


Sidebar.propTypes = {
    archives: PropTypes.array,
    description: PropTypes.string,
    social: PropTypes.array,
    title: PropTypes.string,
};
