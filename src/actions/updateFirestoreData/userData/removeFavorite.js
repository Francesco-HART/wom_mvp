import {db} from "../../../Firebase";
import {DEL_FAVORITE, SHOW_SNACKBAR} from "../../type";
import * as firebase from "firebase";


/**
 * This function will remove a favorite from the current user
 * @param recipe    {object}:   contain recipe's data
 * @param user      {object}:   contain user's data
 */
export const removeFavorite = ( recipe, user ) => async dispatch => {
    try {
        let id="";
        await db.collection("utilisateurs").where("pseudo", "==", user.pseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {id = doc.id;});
        });
        let userRef = db.collection("utilisateurs").doc(id);
        await userRef.update({favoris: firebase.firestore.FieldValue.arrayRemove(recipe.id)});

        dispatch({type: DEL_FAVORITE, payload: recipe.id});
        dispatch({type: SHOW_SNACKBAR, payload: {txt: recipe.name + ' retiré des favoris', variant: "success"}});
    }
    catch(e){
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue de la suppression du favori", variant: "error"}});
    }
};


