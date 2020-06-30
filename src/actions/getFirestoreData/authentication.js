import {db} from "../../Firebase";
import {SHOW_SNACKBAR, AUTH_USER} from "../type";
import Cookies from 'universal-cookie';


/**
 * This function will check if a user exist in database depending on a password and a login value (mail or pseudo)
 * @param user  {object}:   contain login's and password's values
 * @returns     {function(*): boolean} :    false if can't connect, true
 */
export const logIn = (user ) => async dispatch => {
    let isConnexionAllowed = false;
    let userFromDb = "";
    try {
        //because of firebase read quota, we have to reduce as possible the number of request we submit
        //region => check if pseudo or mail associated to password is in database
        await db.collection("utilisateurs").where("pseudo", "==", user.login)
            .where("password" , "==", user.password).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                isConnexionAllowed = true;
                userFromDb = doc.data(); //maybe have to get only interesting data (not the password)
            });
        });
        if (!isConnexionAllowed) {
            await db.collection("utilisateurs").where("email", "==", user.login)
                .where("password" , "==", user.password).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    isConnexionAllowed = true;
                    userFromDb = doc.data();
                });
            });
        }
        //endregion

        //region => results
        if (isConnexionAllowed) {
            dispatch({type: AUTH_USER, payload: userFromDb});
            dispatch({type: SHOW_SNACKBAR, payload: {txt: "vous êtes connecté en tant que " + userFromDb.pseudo, variant: "success"}});
            const cookies = new Cookies();
            cookies.set("userCookie", userFromDb.pseudo, { path: '/' });
            cookies.set("userPassCookie", userFromDb.password, { path: '/' });
        }
        else {
            dispatch({type: SHOW_SNACKBAR, payload: {txt: "impossible de se connecter, identifiants incorrect", variant: "error"}});
        }
        //endregion
    }
    catch(e){
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur c'est produite lors de l'authentification", variant: "error"}});
    }

    return isConnexionAllowed;
};


/**
 * This function will disconnect the current user
 * @return {function(...[*]=)}
 */
export const disconnect = () => async dispatch => {
    try{
        const cookies = new Cookies();
        cookies.remove("userCookie", { path: '/' });
        cookies.remove("userPassCookie", { path: '/' });
        dispatch({type: AUTH_USER, payload: null});
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "Vous vous êtes déconnecté ", variant: "success"}});
    }catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur s'est produite lors de la déconnexion", variant: "error"}});
    }
};
