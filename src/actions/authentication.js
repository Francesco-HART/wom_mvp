import {db} from "../Firebase";
import {SHOW_SNACKBAR, AUTH_USER} from "./type";
import Cookies from 'universal-cookie';
import firebase from 'firebase/app';

export async function addNewUser(user) {
    return await db
    .collection("womers")
    .doc(user["phoneNumber"])
    .set({
        phoneNumber: user["phoneNumber"],
        username: user["username"],
        birthday: user["birthday"],
        address: user["address"],
        city: user["city"],
        postalCode: user["postalCode"],
        country: user["country"],
        mail: user["mail"],
        password: user["password"],
        isPhoneNumberActive: false,
        isMailActive: false,
        isAdmin: false,
        registerDate: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((doc) => {
        console.log("New user created with success");
        return true;
    })
    .catch((e) => {
        console.log("Error occured to wrote a new user : " + e.message);
        return false;
    });
};

export const findUserByPhoneNumber = (phoneNumber) => async dispatch => {
    return await db
    .collection("womers")
    .doc(phoneNumber)
    .get()
    .then(doc => {
        if (doc.data() === undefined) {
            dispatch({type: SHOW_SNACKBAR, payload: {txt: "Aucun Womer associé au numéro " + phoneNumber + " !", variant: "error"}});
            return null;
        }
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "Ravie de vous revoir " + doc.data().username + " !", variant: "success"}});
        return doc.data();
    })
    .catch(e => {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "Impossible de vous connecter !", variant: "error"}});
        return null;
    });
};

export const disconnect = () => async dispatch => {
    try {
        const cookies = new Cookies();
        cookies.remove("userCookie", { path: '/' });
        cookies.remove("userPassCookie", { path: '/' });
        dispatch({type: AUTH_USER, payload: null});
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "Vous vous êtes déconnecté ", variant: "success"}});
    }
    catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur s'est produite lors de la déconnexion", variant: "error"}});
    }
};
