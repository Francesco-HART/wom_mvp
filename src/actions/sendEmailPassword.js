import {db} from "../Firebase";
import {AUTH_USER, SHOW_SNACKBAR} from "./type";

/**
 * This function will help user that have forgot Password to have it (will be send by mail)
 * not working for now, maybe we will develop it in some weeks
 * @param values
 * @return {function(*): boolean}
 */
export const recupPassword = (values) => async dispatch => {
    let isConnexionAllowed = false;
    let user = "";

    try {
        //region check if pseudo or mail associated to password is in database
    }
    catch(e){dispatch({type: SHOW_SNACKBAR, payload: {txt: e, variant: "error"}})}
    return isConnexionAllowed
};

