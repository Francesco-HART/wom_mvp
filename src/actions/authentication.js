import {db} from "../Firebase";
import {SHOW_SNACKBAR, AUTH_USER} from "./type";
import Cookies from 'universal-cookie';
import firebase from 'firebase/app';

export const addNewUser = (user) => async dispatch => {
    console.log("creating a womer");
    return await db
        .collection("womers")
        .doc()
        .set({
            phoneNumber: user["phoneNumber"],
            username: user["username"],
            birthday: user["birthday"],
            address: user["address"],
            city: user["city"],
            postalCode: user["postalCode"],
            country: user["country"],
            mail: user["mail"],
            idInsta: user["idInsta"],
            password: user["password"],
            isPhoneNumberActive: false,
            isMailActive: false,
            isAdmin: false,
            isAddress: false,
            registerDate: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((doc) => {
            // dispatch({type: SHOW_SNACKBAR, payload: {txt: user["username"] + ", votre compte a bien été créé !", variant: "success"}});
            console.log(user["username"] + ", votre compte a bien été créé !");
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: " Nous sommes heureux de te compte parmis nos membres !", variant: "sucess"}
            });
            return true;
        })
        .catch((e) => {
            // dispatch({type: SHOW_SNACKBAR, payload: {txt: "Impossible de créer votre compte ! " + e.message, variant: "error"}});
            console.log("Impossible de créer votre compte ! " + e.message);
            return false;
        });
};

export const isUserAlreadyExists = (phoneNumber) => async dispatch => {
    return await db
        .collection("womers")
        .where("phoneNumber", "==", phoneNumber)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return false;
            }
            return true;
        })
        .catch(e => {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Erreur lors de la séquence d'existance ! " + e.message, variant: "error"}
            });
            return null;
        });
};

export const findUserByPhoneNumber = (phoneNumber, confirmPhone) => async dispatch => {
    return await db
        .collection("womers")
        .where("phoneNumber", "==", phoneNumber)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return null;
            }
            let result = [];
            querySnapshot.forEach(doc => {
                result.push(doc.data());
            })
            if (confirmPhone) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Ravie de vous revoir " + result[0].username + " !", variant: "success"}
                });
                dispatch({type: AUTH_USER, payload: result[0]});
            }
            return result[0];
        })
        .catch(e => {
            dispatch({type: SHOW_SNACKBAR, payload: {txt: "Impossible de vous connecter !", variant: "error"}});
            return null;
        });
};

export const disconnect = () => async dispatch => {
    try {
        const cookies = new Cookies();
        cookies.remove("userCookie", {path: '/'});
        cookies.remove("userPassCookie", {path: '/'});
        dispatch({type: AUTH_USER, payload: null});
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "Vous vous êtes déconnecté ", variant: "success"}});
    } catch (e) {
        dispatch({
            type: SHOW_SNACKBAR,
            payload: {txt: "une erreur s'est produite lors de la déconnexion", variant: "error"}
        });
    }
};


/**
 * This function will check if a user exist in database depending on a password and a login value (mail or pseudo)
 * @param user  {object}:   contain login's and password's values
 * @returns     {function(*): boolean} :    false if can't connect, true
 */
export const logIn = (user) => async dispatch => {
    let isConnexionAllowed = false;
    let userFromDb = "";
    try {
        //because of firebase read quota, we have to reduce as possible the number of request we submit
        //region => check if pseudo or mail associated to password is in database
        await db.collection("utilisateurs").where("pseudo", "==", user.login).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().password === user.password) {
                    isConnexionAllowed = true;
                    userFromDb = doc.data(); //maybe have to get only interesting data (not the password)
                }
            });
        });
        if (!isConnexionAllowed) {
            await db.collection("utilisateurs").where("email", "==", user.mail).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().password === user.password) {
                        isConnexionAllowed = true;
                        userFromDb = doc.data();
                    }
                });
            });
        }
        //endregion

        //region => results
        if (isConnexionAllowed) {
            dispatch({type: AUTH_USER, payload: userFromDb});
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "vous êtes connecté en tant que " + userFromDb.mail, variant: "success"}
            });
            const cookies = new Cookies();
            cookies.set("userCookie", userFromDb.mail, {path: '/'});
            cookies.set("userPassCookie", userFromDb.password, {path: '/'});
        } else {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "impossible de se connecter, identifiants incorrect", variant: "error"}
            });
        }
        //endregion
    } catch (e) {
        dispatch({
            type: SHOW_SNACKBAR,
            payload: {txt: "une erreur c'est produite lors de l'authentification", variant: "error"}
        });
    }

    return isConnexionAllowed;
};


