import {db} from "../../Firebase";
import {SHOW_SNACKBAR} from "../type";


/**
 * This function get all ingredients available from recipes, from firebase
 * @returns     {function(*): []} : ingredients array from firestore
 */
export const getIngredients =  () => async dispatch =>{
    let ingredients = [];
    try {
        await db.collection("ingredients").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                ingredients = doc.data().ingredients;
            });
        });
    }
    catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "erreur lors du chargement des ingredients", variant: "error"}});
    }
    return ingredients;
};
