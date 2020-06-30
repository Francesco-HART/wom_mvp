import React from 'react';
import {connect} from "react-redux";
import {Search} from "../map/Search";
import {Layer} from "../map/Layer";
import {TextField, Button, Typography, Box, Grid, Fab, withStyles, Dialog, DialogActions} from "@material-ui/core";
import {Map, Marker, Popup} from "react-leaflet";
import PublishIcon from '@material-ui/icons/Publish';


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


/**
 * This component contain a number of TextField depending on the number in the array 'arrayField' given in props
 * it is available only for user's that have permission to create post for destockage
 */
class FormCreateTrader extends React.Component {

    componentDidMount = async () => {//const account_batteries = await this.props.fetchCurrentUserBatteries();
        this.setState({destockagePost: []});

        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                viewport: {
                    center: [position.coords.latitude, position.coords.longitude],
                    zoom: 13,
                },
            });
        });
    };


    state = {
        viewport: DEFAULT_VIEWPORT,
        zoom: 13,
        data: null,
        drawer: false,
        open: false,
        lat: null,
        lng: null,
        showMarker: false,
        submit: true
    };

    toShowMarker = () => {
        this.setState({showMarker: true})
    };

    onSubmit = () => {
        this.toShowMarker()
        this.setState({
            open: false,
            submit: false
        });
        this.props.confirmAddress(this.state.lat, this.state.lng)
    };

    onClose = () => {
        this.setState({
            open: false,
        });
    }

    openDialog = (data) => {
        this.setState({
            lat: data.latlng.lat,
            lng: data.latlng.lng,
            open: true,
        });
    };

    render() {
        const {viewport, lat, lng, open, showMarker} = this.state;

        const {
            handleSubmit, values, touched, errors, handleChange, arrayField, classes,
            dateField
        } = this.props;
        return (
            <>
                <Grid container justify='center' spacing={2}>
                    {dateField.map(field => (
                        <Grid item>

                            <TextField
                                type="time" name={field.name} id={field.name}
                                onChange={handleChange} key={field.name} label={field.label}
                                InputLabelProps={{shrink: true}} variant="outlined"
                                value={values[field.name]}
                                inputProps={{min: '2020-05-24'}}
                                helperText={errors[field.name] && touched[field.name] && errors[field.name]}
                                error={touched[field.name] && Boolean(errors[field.name])}

                            />
                        </Grid>))}
                </Grid>
                <Grid item style={{marginTop: 20}}>
                    <Typography align='center' variant='h6' style={{color: '#ff6f61'}}
                    >
                        Placer votre
                        établissement
                    </Typography>
                </Grid>
                <div style={{width: '80%', margin: 'auto'}}>
                    <Box border={2} borderColor="primary.main" borderRadius={4}>
                        <Map
                            radius={12}
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
                            <Search/>
                            {showMarker ? <Marker position={[lat, lng]}> <Popup>{values.name}</Popup></Marker> : null}
                            <Dialog
                                aria-labelledby="confirmation-dialog-title"
                                open={open}
                                disableScrollLock={true}
                            >
                                <DialogActions>
                                    <Button
                                        autoFocus
                                        size="small"
                                        variant="contained"
                                        onClick={this.onClose}
                                        color="default"
                                    >
                                        Retour
                                    </Button>
                                    <Button
                                        type="submit"
                                        onClick={this.onSubmit}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Valider
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Map>
                    </Box>
                </div>
                <form onSubmit={handleSubmit} style={{margin: 20}}>
                    <Grid container justify="center" spacing={2}>
                        {arrayField.map(field => (

                                <Grid item xs={12} md={field.name === 'description' ? 12 : 3}>
                                    <TextField
                                        step="0.01"
                                        fullWidth={true}
                                        multiline={field.name === 'description' ? true : false}
                                        type={field.type} name={field.name} id={field.name}
                                        onChange={handleChange} key={field.name} label={field.label}
                                        InputLabelProps={{shrink: true}}
                                        variant={field.name === 'description' ? 'filled' : "outlined"}
                                        value={values[field.name]}
                                        helperText={errors[field.name] && touched[field.name] && errors[field.name]}
                                        error={touched[field.name] && Boolean(errors[field.name])}
                                        inputProps={field.type === "number" ? {step: 0.1, min: 0} : {}}
                                    />
                                </Grid>
                            )
                        )
                        }
                        <Grid
                            container
                            justify='center'>
                            <Grid item>
                                <Fab
                                    disabled={this.state.submit}
                                    type='valider'
                                    color="primary"
                                    className={classes.fab}
                                >
                                    <PublishIcon/>
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </>
        );
    }
}

export default connect(null, {})(withStyles(styles)(FormCreateTrader));

