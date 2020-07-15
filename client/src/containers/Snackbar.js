import React from "react";
import MySnackbar from "../components/mui/MySnackbar";
import { connect } from "react-redux";
import { hideSnackbar } from "../actions/snackbar";


/**
 * This is a Bar that appear in bottom left to display some text,
 * for example when we sigIn, when we connected, or error
 */
class Snackbar extends React.Component {
    onCloseSnackbar = () => {
        this.props.hideSnackbar();
    };

    render() {
        return (
            <div>
                {this.props.snackbar.show && (
                    <MySnackbar
                        snackbar_message={this.props.snackbar.txt}
                        variant={this.props.snackbar.variant}
                        vertical="bottom"
                        horizontal="left"
                        onClose={this.onCloseSnackbar}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps({ snackbar }) {
    return { snackbar };
}

export default connect(
    mapStateToProps,
    { hideSnackbar }
)(Snackbar);
