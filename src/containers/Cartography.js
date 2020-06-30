import React, {Component} from "react";
import {Map, Marker} from "react-leaflet";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {getPost} from "../actions/getFirestoreData/getPost"
import {createTrader} from '../actions/updateFirestoreData/userData/createTrader'
import {showSnackbar} from "../actions/snackbar";
import {Layer} from "../components/map/Layer";
import {Search} from "../components/map/Search";
import {DestockageMap} from "../components/map/DestockageMap";
import {Box, LinearProgress} from "@material-ui/core";


const styles = (theme) => ({
    fab: {
        margin: 0,
        top: "auto",
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        left: "auto",
        position: "fixed",
        zIndex: 1000,
    },
    map: {
        [theme.breakpoints.down("sm")]: {height: "75vh"},
        [theme.breakpoints.up("sm")]: {height: "85vh"},
    },
});

const DEFAULT_VIEWPORT = {
    center: [49.0862337, 1.9243652999999996],
    zoom: 13,
};

class Cartography extends Component {
    constructor(props) {
        super(props);
        // state
        this.state = {
            viewport: DEFAULT_VIEWPORT,
            zoom: 13,
            data: null,
            drawer: false,
            open: false,
            lat: null,
            lng: null,
            destockagePost: [],
        };
        // refs
        this.refMap = React.createRef();
        this.refMarkers = {};
    }

    componentDidMount = async () => {
        const destockagePost = await this.props.getPost();
        this.setState({destockagePost: destockagePost});
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                viewport: {
                    center: [position.coords.latitude, position.coords.longitude],
                    zoom: 13,
                },
            });
        });
    };

    openDialog = (data) => {
        this.setState({
            lat: data.latlng.lat,
            lng: data.latlng.lng,
            open: true,
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    submitLocalizedPost = async (battery) => {
        const updated_post = await this.props.createPost(
            battery.value,
            this.props.auth,
            false
        );
        this.setState({
            open: false,
            destockagePost: [...this.state.destockagePost, updated_post],
            viewport: this.refMap.viewport.center
                ? this.refMap.viewport
                : this.state.viewport,
        });
    };
    showMarker = (lat, lng) => {
        if (this.state.open) return <Marker position={[lat, lng]}></Marker>;
    };

    onSelectPost = async (post) => {
        if (!(post.localization))
            this.props.showSnackbar(
                "Cette adresse n'a pas été géolocalisée",
                "error"
            );
        else {
            await this.setState({
                viewport: {
                    center: post.localization,
                    zoom: 15,
                    open: false,
                },
            })

        }
        try {
            this.refMarkers[post.informations.login].leafletElement.openPopup();
            this.toggleDrawer(false);
        } catch (e) {
            this.props.showSnackbar('Votre annonce n\'existe plus', 'error')
        }

    };


    render() {
        if (!this.state.destockagePost) return <LinearProgress/>;
        const { viewport, lat, lng, destockagePost} = this.state;
        const {classes} = this.props;

        return (
            <div style={{width: '100%', margin: 'auto'}}>
                <Box border={1} borderColor="primary.main" borderRadius={4}>

                    <Map
                        ref={(ref) => {
                            this.refMap = ref;
                        }}
                        animated={true}
                        viewport={viewport}
                        className={classes.map}
                        worldCopyJump={false}
                        zoomControl={false}
                        minZoom={3}
                        onContextmenu={this.openDialog}
                        maxBounds={[
                            [-90, -180],
                            [90, 180],
                        ]}
                        maxBoundsViscosity={1.0}
                    >
                        <Layer/>
                        <DestockageMap
                            auth={this.props.auth && this.props.auth}
                            destockagePost={destockagePost}
                            inputRef={(el, post_id) => (this.refMarkers[post_id] = el)}
                        />
                        <Search/>
                        {this.showMarker(lat, lng)}
                    </Map>
                </Box>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(
    mapStateToProps,
    {getPost, showSnackbar, createPost: createTrader}
)(withStyles(styles)(Cartography))
