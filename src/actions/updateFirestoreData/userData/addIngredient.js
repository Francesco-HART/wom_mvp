import {db} from "../../../Firebase";
import {AUTH_USER, SHOW_SNACKBAR} from "../../type";
import * as firebase from "firebase";


/**
 * This function will add an ingredients in the current user's list
 * @param values    {object}: ingredient's data
 * @param user      {object}: user's data
 * @return          {function(...[*]=)}
 */
export const addIngredient = ( values, user ) => async dispatch => {
    try {
        let id="";
        await db.collection("utilisateurs").where("pseudo", "==", user.pseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {id = doc.id;});
        });

        let userRef = db.collection("utilisateurs").doc(id)
        await userRef.update({ingredients: firebase.firestore.FieldValue.arrayUnion(values)});

        await userRef.get().then((doc) => {
            let user = doc.data();
            dispatch({type: AUTH_USER, payload: user}); //should only add the ingredient, not reset user's data for better usage
            dispatch({type: SHOW_SNACKBAR, payload: {txt: values + ' ajouté à vos ingrédients', variant: "success"}});
        });
    }
    catch(e){
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de l'ajout de l'ingredient", variant: "error"}});
    }
};
