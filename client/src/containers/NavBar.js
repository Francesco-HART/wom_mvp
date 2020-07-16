import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from "@material-ui/icons/Menu";
import {Brightness6} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Account from "@material-ui/icons/PersonPin";
import Earth from "@material-ui/icons/AddLocation";
import Home from "@material-ui/icons/Home";
import Reset from '@material-ui/icons/TrackChanges';

import {disconnect} from "../actions/authentication";
import {resetOffers} from '../actions/address';

import {
    CssBaseline,
    Drawer,
    Hidden,
    Grid,
    IconButton,
    Tooltip,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";


const drawerWidth = 240;

const styles = (theme) => {
    return {
        root: {display: "flex"},
        title: {padding: theme.spacing(2), textAlign: "center"},
        drawer: {
            [theme.breakpoints.up("md")]: {width: drawerWidth, flexShrink: 0},
        },
        appBar: {
            backgroundColor:
                theme.palette.type === "light" ? theme.palette.primary.main : null,
            [theme.breakpoints.up("md")]: {
                width: `100% `,
                marginLeft: drawerWidth,
            },
        },
        appBarIcon: {color: "white"},
        menuButton: {
            color: "white",
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("md")]: {display: "none"},
        },
        toolbar: {...theme.mixins.toolbar},
        drawerPaper: {width: drawerWidth},
        content: {
            [theme.breakpoints.up("sm")]: {
                maxWidth: `100% `,
            },
            [theme.breakpoints.down("sm")]: {maxWidth: "100%"},
            flexGrow: 1,
            padding: theme.spacing(3),
            fontFamily :  'Archivo Black'
        },
        icon: {marginBottom: 3},
        logo: {height: "58px", paddingTop: 5},
        selectedTab: {backgroundColor: theme.palette.grey.main},
    };
};

class NavBar extends React.Component {
    state = {mobileOpen: false, selectedItem: null, open_config_menu: false};

    componentDidMount = async () => {
        this.setState({selectedItem: window.location.pathname});
    };

    handleClickConfig = () => {
        this.setState({open_config_menu: !this.state.open_config_menu});
    };

    handleDrawerToggle = () => {
        this.setState((state) => ({mobileOpen: !state.mobileOpen}));
    };

    handleSelectItem = (link) => {
        if (this.state.mobileOpen)
            this.setState((state) => ({mobileOpen: !state.mobileOpen}));
        this.setState({selectedItem: link});
    };

    renderListItem = ({link, title, icon, disabled}) => (
        <ListItem
            button
            disabled={disabled}
            to={link}
            component={Link}
            onClick={() => this.handleSelectItem(link)}
            className={
                this.state.selectedItem === link ? this.props.classes.selectedTab : null
            }
        >
            <ListItemIcon className={this.props.classes.icon}>{icon}</ListItemIcon>
            <ListItemText primary={title}/>
        </ListItem>
    );

    setTheme = () => {
        this.props.setThemeColor(!this.props.themeColor);
        console.log(this.props.themeColor);
        const cookies = new Cookies();
        cookies.set("colorTheme", this.props.themeColor, {path: '/'});
    };

    resetAllOffers = async () => {
        await this.props.resetOffers();
    }

    render() {
        const {classes, theme, container} = this.props;
        return this.props.auth === null ? 
        <div>
            <CssBaseline/>
        <main className={classes.content}>
            {this.props.children}
        </main> 
    </div> :
               <div className={classes.root}>
                <CssBaseline/>
               <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Grid container justify="space-between">

                            <Grid item>
                                <Tooltip
                                    title="Home"
                                    aria-label="home"
                                    style={{marginRight: 10}}
                                    className={classes.appBarIcon}
                                >
                                    <IconButton to="/" component={Link}>
                                        <Home/>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip
                                    title="Couleur"
                                    aria-label="couleur"
                                    style={{marginRight: 10}}
                                    className={classes.appBarIcon}
                                >
                                    <IconButton
                                        onClick={this.setTheme}/*onClick={() => this.props.setThemeColor(!this.props.themeColor)}*/>
                                        <Brightness6/>
                                    </IconButton>
                                </Tooltip>

                                {this.props.auth && this.props.auth.status === 'admin' &&
                                <Tooltip
                                    title="Réinitialisé les offres"
                                    aria-label="réinitialisé les offres"
                                    style={{marginRight: 10}}
                                    className={classes.appBarIcon}
                                >
                                    <IconButton onClick={this.resetAllOffers}>
                                        <Reset/>
                                    </IconButton>
                                </Tooltip>}

                                {this.props.auth && (this.props.auth.status === 'admin' || this.props.auth.status === 'address') &&
                                <Tooltip
                                    title="Ajouter une adresse"
                                    aria-label="ajouter une adresse"
                                    style={{marginRight: 10}}
                                    className={classes.appBarIcon}
                                >

                                    <IconButton to="/new-address" component={Link}>
                                        <Earth/>
                                    </IconButton>
                                </Tooltip>}

                                <Tooltip
                                    title={this.props.auth ? "Déconnexion" : "Connexion"}
                                    aria-label={this.props.auth ? "deconnexion" : "connexion"}
                                    style={{marginRight: 10}}
                                    className={classes.appBarIcon}
                                >
                                    {this.props.auth ?
                                        <IconButton onClick={async () => await this.props.disconnect()}>
                                            <ExitToAppIcon/>
                                        </IconButton>
                                        :
                                        <IconButton to="/login" component={Link}>
                                            <Account/>
                                        </IconButton>
                                    }
                                      </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                
            </div>
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};


export default connect(mapStateToProps, {
    disconnect,
    resetOffers
})(withStyles(styles, {withTheme: true})(NavBar));
