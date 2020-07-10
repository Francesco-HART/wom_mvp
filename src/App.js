import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core/styles";
import Snackbar from "./containers/Snackbar";
import NavBar from "./containers/NavBar"
//import socketIOClient from "socket.io-serveur";
import Routes from "./routes";
import {theme} from "./components/MUITheme/app";
import CookieHandler from "./components/CookieHandler";
import Cookies from 'universal-cookie';


class App extends React.Component {
    state = {
        themeColorAdaptation : false,
        isLoading : true
    };

    componentDidMount() {
        const cookies = new Cookies();
        this.setState({
            // themeColorAdaptation : cookies.get('colorTheme') && cookies.get('colorTheme') === "true" ? false : true,
            themeColorAdaptation : cookies.get('colorTheme') && cookies.get('colorTheme') !== "true",
            isLoading : false
        });
    }

    setColorTheme = () =>{
        this.setState({ themeColorAdaptation : !this.state.themeColorAdaptation });
    };

    render() {
        const themeColor = theme(this.state.themeColorAdaptation ? 'light' : "dark");
        const cookies = new Cookies();

        return (
            (cookies.get('userCookie') /*? true : false*/) && !this.props.auth ? <CookieHandler/> :
                <MuiThemeProvider theme={themeColor}>
                    <BrowserRouter>
                        <div style={{height: "100%"}}>
                            <NavBar themeColor={this.state.themeColorAdaptation} setThemeColor={this.setColorTheme}>
                                <Routes/>
                            </NavBar>
                        </div>
                        <Snackbar/>
                    </BrowserRouter>
                </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(
    mapStateToProps,
    null
)(App);

