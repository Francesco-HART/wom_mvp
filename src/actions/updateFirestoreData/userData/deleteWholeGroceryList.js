import {db} from "../../../Firebase";
import * as firebase from "firebase";
import {AUTH_USER, SHOW_SNACKBAR} from "../../type";


/**
 * This function will remove whole user's grocery list from firestore
 * @param values    {object}: contain user's pseudo
 */
export const deleteWholeGroceryList = (values) => async dispatch => {
    try {
        let id = "";
        await db.collection("utilisateurs").where("pseudo", "==", values.userPseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                id = doc.id;
            });
        });
        let recipeRef = db.collection("utilisateurs").doc(id);
        await recipeRef.update({myList: firebase.firestore.FieldValue.delete()});

        let user = null;
        await db.collection("utilisateurs").where("pseudo", "==", values.userPseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                user = doc.data();
            });
        });

        dispatch({type: AUTH_USER, payload: user});
        dispatch({type: SHOW_SNACKBAR, payload: {txt: 'liste de course supprimée', variant: "success"}});

    } catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: e, variant: "error"}});
    }
};


/**
 * This function will delete only ingredients from one recipe from user's grocery list
 * @param values    {object} : contain user's pseudo and all recipe's data to remove from the list
 * @return          {function(...[*]=)}
 */
export const deleteFromGroceryList = (values) => async dispatch => {
    try {
        let id = "";
        await db.collection("utilisateurs").where("pseudo", "==", values.userPseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                id = doc.id;
            });
        });
        let recipeRef = db.collection("utilisateurs").doc(id);
        await recipeRef.update({myList: firebase.firestore.FieldValue.arrayRemove(values.element)});

        let user = null;
        await db.collection("utilisateurs").where("pseudo", "==", values.userPseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                user = doc.data();
            });
        });

        dispatch({type: AUTH_USER, payload: user});
        dispatch({type: SHOW_SNACKBAR, payload: {txt: 'liste de course supprimée', variant: "success"}});

    } catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur s'est produite lors de la suppression de votre liste de course", variant: "error"}});
    }
};

