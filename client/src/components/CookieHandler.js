import React from 'react';
import {connect} from "react-redux";
import Cookies from 'universal-cookie';
import {getUserByPhoneNumber} from "../actions/authentication";
import LinearProgress from "@material-ui/core/LinearProgress";

/**
 * This function is used to check if the user have already been connected by checking cookies.
 * if there is the required cookies, we check if they are in database, and then the user was automatically connected
 */
class CookieHandler extends React.Component {
    state = {isLoading: true};
    _isMounted = false;

    componentDidMount = async () =>{
        this._isMounted = true;

        const cookies = new Cookies();
        let cookie = cookies.get('userCookie') ? cookies.get('userCookie') : "";
        let cookie2 = cookies.get('userPassCookie') ? cookies.get('userPassCookie') :"";
        if (cookie !=="" && cookie2!==""){
            await this.props.getUserByPhoneNumber({login:cookie, password:cookie2});
        }
        if (this._isMounted) {
            this.setState({isLoading: false});
        }
        console.log("try CookieHandler end");
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    };

    render(){
        return this.state.isLoading ? <LinearProgress/> : null;
    }
}

export default connect(null, {getUserByPhoneNumber})(CookieHandler)
