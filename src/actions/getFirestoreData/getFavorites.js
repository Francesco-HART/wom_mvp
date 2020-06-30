import {db} from "../../Firebase";
import {SHOW_SNACKBAR} from "../type";


/**
 * This function get user's favorites recipe's data get from firebase
 * @param favorites {array} : favorite's id
 * @returns         {function(*): []}
 */
export const getFavorites =  (favorites ) => async dispatch =>{
    let favoritesRecipe = [];
    try {
        if (favorites && favorites.length) {

            //because of firebase read quota, we have to reduce as possible the number of request we submit
            for (let i=0; i<favorites.length; i++){
                await db.collection("recipes").where("id", "==", favorites[i]).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (favorites.includes(doc.data().id) ) {
                            favoritesRecipe.push(doc.data());
                        }
                    });
                });
            }
        }
    }
    catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de la récupération des favoris", variant: "error"}});
    }
    return favoritesRecipe;
};
