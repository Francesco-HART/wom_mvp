import {db} from "../../../Firebase";
import {ADD_FAVORITE, SHOW_SNACKBAR} from "../../type";
import * as firebase from "firebase";


/**
 * This function will add a favorite in the current user's list
 * @param values    {object}: contain user's pseudo and recipe's data
 */
export const addFavorite = (values) => async dispatch => {
    try {
        let id = "";
        await db.collection("utilisateurs").where("pseudo", "==", values.userPseudo ? values.userPseudo : "").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                id = doc.id;
            });
        });

        let userRef = db.collection("utilisateurs").doc(id);
        await userRef.update({favoris: firebase.firestore.FieldValue.arrayUnion(values.recipe.id)});

        dispatch({type:ADD_FAVORITE, payload: values.recipe.id});
        dispatch({
            type: SHOW_SNACKBAR,
            payload: {txt: values.recipe.name + ' ajouté aux favoris', variant: "success"}
        });
    } catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de l'ajout du favori", variant: "error"}});
    }
};

