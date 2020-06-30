import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {disconnect, logIn} from "../actions/getFirestoreData/authentication";
import {withStyles} from "@material-ui/core/styles";
import Cookies from 'universal-cookie';
import AppBar from '@material-ui/core/AppBar';
import Logo from "../components/mui/Logo";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Home from '@material-ui/icons/Home';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FaceIcon from '@material-ui/icons/Face';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PublicIcon from '@material-ui/icons/Public';
import MenuIcon from "@material-ui/icons/Menu";
import {Brightness6} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Account from "@material-ui/icons/PersonPin";


import {
    CssBaseline,
    Drawer,
    Hidden,
    Grid,
    IconButton,
    Tooltip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider
} from "@material-ui/core";


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
                width: `calc(100% - ${drawerWidth}px)`,
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
                maxWidth: `calc(100% - ${drawerWidth}px)`,
            },
            [theme.breakpoints.down("sm")]: {maxWidth: "100%"},
            flexGrow: 1,
            padding: theme.spacing(3),
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

    render() {
        const {classes, theme, container} = this.props;
        const {mobileOpen/*, open_config_menu*/} = this.state;

        const drawer = (
            <div>
                <div className={classes.toolbar} style={{textAlign: "center"}}>
                    <Logo/>
                </div>
                <Divider/>
                <List>
                    {this.renderListItem({
                        link: "/",
                        icon: <Home/>,
                        title: "Tableau de bord",
                    })}
                    {this.props.auth ?
                        this.renderListItem({
                            link: "/accueil",
                            icon: <AddCircleIcon/>,
                            title: "accueil",
                        })
                        : null}
                    {!this.props.auth && this.renderListItem({
                        link: "/inscription",
                        icon: <AddCircleIcon/>,
                        title: "Deviens un Womer",
                    })
                    }
                    {
                        this.renderListItem({
                            link: "/post/creer",
                            icon: <PostAddIcon/>,
                            title: "Créer Wom Trader",
                        })
                    }
                    {
                        this.renderListItem({
                            link: "/destockage",
                            icon: <PublicIcon/>,
                            title: "Wom Trader",
                        })
                    }
                </List>
            </div>
        );
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Grid container justify="space-between">
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={this.handleDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>

                            <Grid item>
                                {this.props.auth && this.props.auth.type === 'admin' &&
                                <Tooltip
                                    title="Créer un utilisateur"
                                    aria-label="Créer-utilisateur"
                                    style={{marginRight: 10}}
                                    className={classes.appBarIcon}
                                >
                                    <IconButton to="/utilisateur/creer" component={Link}>
                                        <GroupAddIcon/>
                                    </IconButton>
                                </Tooltip>}

                                {this.props.auth &&
                                <Tooltip
                                    title="Mon compte"
                                    aria-label="compte"
                                    style={{marginRight: 10}}
                                    className={classes.appBarIcon}
                                >
                                    <IconButton to="/profil/informations" component={Link}>
                                        <FaceIcon/>
                                    </IconButton>
                                </Tooltip>}

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

                                <Tooltip style={{marginRight: 10}}
                                         className={classes.appBarIcon}
                                         title={this.props.auth ? "Déconnexion" : "Connexion"}
                                         aria-label={this.props.auth ? "deconnexion" : "connexion"}>
                                    {this.props.auth ?
                                        <IconButton onClick={async () => await this.props.disconnect()}>
                                            <ExitToAppIcon/>
                                        </IconButton>
                                        :
                                        <IconButton to="/connexion" component={Link}>
                                            <Account/>
                                        </IconButton>
                                    }
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <nav className={classes.drawer}>
                    <Hidden mdUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === "rtl" ? "right" : "left"}
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{paper: classes.drawerPaper}}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{paper: classes.drawerPaper}}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};


export default connect(mapStateToProps, {
    logIn,
    disconnect,
})(withStyles(styles, {withTheme: true})(NavBar));
