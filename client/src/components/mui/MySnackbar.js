import React, { Component } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {IconButton, Snackbar, SnackbarContent} from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};


const styles = theme => ({
    success: { backgroundColor: green[600] },
    error: { backgroundColor: theme.palette.error.dark },
    info: { backgroundColor: theme.palette.primary.dark },
    warning: { backgroundColor: amber[700] },
    message: { display: "flex", alignItems: "center" },
    icon: { fontSize: 20 },
    iconVariant: { opacity: 0.9, marginRight: theme.spacing(1) }
});


/**
 * This class is used to display a Snackbar at bottom left
 */
class MySnackbar extends Component {
    state = { exit: false };

    handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") return;
        this.setState({ exit: true });
        if (this.props.onClose) this.props.onClose();
    };

    render() {
        const { classes } = this.props;
        const {
            snackbar_message,
            vertical,
            horizontal,
            onExited,
            variant,
            className
        } = this.props;
        const Icon = variantIcon[variant];

        return (
            <Snackbar
                anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
                open={snackbar_message && !this.state.exit ? true : false}
                autoHideDuration={5000}
                onClose={this.handleCloseSnackbar}
                onExited={onExited}
            >
                <SnackbarContent
                    className={clsx(classes[variant], className)}
                    aria-describedby="message-id"
                    message={
                        <span id="message-id" className={classes.message}>
                            <Icon className={(classes.icon, classes.iconVariant)} />
                            {snackbar_message}
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleCloseSnackbar}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    ]}
                />
            </Snackbar>
        );
    }
}


MySnackbar.propTypes = {
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};


export default withStyles(styles)(MySnackbar);
