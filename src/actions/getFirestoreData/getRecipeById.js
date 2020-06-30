import {db} from "../../Firebase";
import {SHOW_SNACKBAR} from "../type";


/**
 * This function get recipe depending on recipe's id given in parameter
 * @param id    {int}: recipes' id
 * @return      {function(...[*]=)} recipes' data
 */
export const getRecipeById =  (id) => async dispatch =>{
    let recipes = null;
    try {
        await db.collection("recipes").where("id", "==", parseInt(id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                recipes=doc.data();
            });
        });
    }
    catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de la récupération des données", variant: "error"}});
    }
    return recipes;

};
