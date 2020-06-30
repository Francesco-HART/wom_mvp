import {db} from "../../../Firebase";
import {AUTH_USER, SHOW_SNACKBAR} from "../../type";
import * as firebase from "firebase";


/**
 * This function will remove an ingredient from the current user
 * @param ingredient    {object}:   contain recipe's data
 * @param user          {object}:   contain user's data
 */
export const removeIngredient = ( ingredient, user ) => async dispatch => {
    try {
        let id="";
        await db.collection("utilisateurs").where("pseudo", "==", user.pseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {id = doc.id;});
        });
        let userRef = db.collection("utilisateurs").doc(id);
        await userRef.update({ingredients: firebase.firestore.FieldValue.arrayRemove(ingredient)});

        await userRef.get().then((doc) => {
            let user = doc.data();
            dispatch({type: AUTH_USER, payload: user});
            dispatch({type: SHOW_SNACKBAR, payload: {txt: ingredient + ' retiré des ingredients', variant: "success"}});
        });
    }
    catch(e){
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de la suppression de l'ingredient", variant: "error"}});
    }
};

