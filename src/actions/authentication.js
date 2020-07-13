import {SHOW_SNACKBAR, AUTH_USER} from "./type";
import Cookies from 'universal-cookie';
import {db} from "../Firebase";
import * as firebase from 'firebase';
import 'firebase/firestore';

export const addNewUser = (user) => async dispatch => {
    return await db
        .collection("womers")
        .doc()
        .set({
            phoneNumber: user["phoneNumber"].replace(" ", ""),
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
            status: "none",
            registerDate: firebase.firestore.FieldValue.serverTimestamp(),
            documentId: null
        })
        .then(async () => {
            const documentId = await getUserDocumentId(user["phoneNumber"].replace(" ", ""));
            if (documentId === null) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Compté créé. Impossible de trouver le compte !", variant: "error"}
                });
                return null;
            }
            else {
                return await db
                    .collection("womers")
                    .doc(documentId)
                    .update({documentId: documentId})
                    .then(() => {
                        dispatch({
                            type: SHOW_SNACKBAR,
                            payload: {txt: "Nous sommes heureux de te compte parmis nos membres !", variant: "success"}
                        });
                        return true;
                    })
                    .catch(e => {
                        dispatch({
                            type: SHOW_SNACKBAR,
                            payload: {txt: "Compte créé. Erreur lors de l'écriture du documentID du compte : '" + documentId + "' !\n" + e.message, variant: "error"}
                        });
                        return null;
                    });
            }
        })
        .catch((e) => {
            dispatch({
                type: SHOW_SNACKBAR, 
                payload: {txt: "Impossible de créer votre compte !\n" + e.message, variant: "error"}
            });
            return null;
        });
};

async function getUserDocumentId(phoneNumber) {
    return await db
        .collection("womers")
        .where("phoneNumber", "==", phoneNumber)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return null;
            }
            let allDocumentsId = [];
            querySnapshot.forEach((doc) => {
                allDocumentsId.push(doc.$c.path.segments[6]);
            });
            // return the first element cause the array is supposed to have only once.
            return allDocumentsId[0];
        })
        .catch(e => {
            return null;
        });
}

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

export const findUserByPhoneNumber = (phoneNumber) => async dispatch => {
    return await db
        .collection("womers")
        .where("phoneNumber", "==", phoneNumber)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Aucun womer associé à ce numéro !", variant: "error"}
                });
                return null;
            }
            let result = [];
            querySnapshot.forEach(doc => {
                result.push(doc.data());
            })
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Ravie de vous revoir " + result[0].username + " !", variant: "success"}
            });
            dispatch({type: AUTH_USER, payload: result[0]});
            return result[0];
        })
        .catch(e => {
            dispatch({type: SHOW_SNACKBAR, payload: {txt: "Impossible de vous connecter !", variant: "error"}});
            return null;
        });
};

export const findUserByUsernameAndPassword = (username, password) => async dispatch => {
    return await db
        .collection("womers")
        .where("username", "==", username)
        .where("password", "==", password)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: "Aucun utilisateur associé à ce Pseudo et ce mot de passe ! ", variant: "error"}
                });
                return false;
            }
            let result = [];
            querySnapshot.forEach(user => {
                result.push(user.data());
            })
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Ravie de vous revoir " + result[0].username + " !", variant: "success"}
            });
            dispatch({type: AUTH_USER, payload: result[0]});
            return true;
        })
        .catch(err => {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: "Imposible de récupérer l'utilisateur ! " + err.message, variant: "error"}
            });
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
