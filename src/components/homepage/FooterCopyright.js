import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Container, Typography, Link} from '@material-ui/core';


/**
 * This function is used to display a copyright section in our footer
 * @return {*}
 * @constructor
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Womparis
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));


/**
 * This function is used to display our footer, with copyright and a little message
 * @param props {object} : props, contains a string => description
 * @return {*}
 * @constructor
 */
export default function FooterCopyright(props) {
  const classes = useStyles();
  const { description } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          <span role="img" aria-label="ok signal">&#128076;</span>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}


FooterCopyright.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
