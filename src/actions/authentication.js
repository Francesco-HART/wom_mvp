import {db} from "../Firebase";
import {SHOW_SNACKBAR, AUTH_USER} from "./type";
import Cookies from 'universal-cookie';
import firebase from 'firebase/app';

export async function addNewUser(user) {
    console.log("creating a womer");
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
        isAddress: false,
        registerDate: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((doc) => {
        // dispatch({type: SHOW_SNACKBAR, payload: {txt: user["username"] + ", votre compte a bien été créé !", variant: "success"}});
        console.log(user["username"] + ", votre compte a bien été créé !");
        return true;
    })
    .catch((e) => {
        // dispatch({type: SHOW_SNACKBAR, payload: {txt: "Impossible de créer votre compte ! " + e.message, variant: "error"}});
        console.log("Impossible de créer votre compte ! " + e.message);
        return false;
    });
};

export async function isUserAlreadyExists(phoneNumber) {
    console.log("search if exist a womer : " + phoneNumber);
    return await db
    .collection("womers")
    .doc(phoneNumber)
    .get()
    .then(doc => {
        console.log("doc.data() : ");
        console.log(doc.data());
        if (doc.data() === undefined) {
            return false;
        }
        return true;
    })
    .catch(e => {
        // dispatch({type: SHOW_SNACKBAR, payload: {txt: "Erreur lors de la séquence d'existance !", variant: "error"}});
        console.log("Erreur lors de la séquence d'existance !");
        return null;
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
        dispatch({type: AUTH_USER, payload: doc.data()});
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
