import {db} from "../../../Firebase";
import {AUTH_USER, SHOW_SNACKBAR} from "../../type";
import * as firebase from "firebase";
import {getDateWithHourMnSeconds} from "../../calcul/getDate";
import React from "react";


/**
 * This function will add ingredients in the current user's grocery list
 * @param values    {object}: ingredient data: quantity and name;
 * plus user's selected number of people which eat it, and recipe's data
 * @return {function(...[*]=)}
 */
export const addRecipeIngredient = ( values ) => async dispatch => {
    try {
        let ing = [];
        // we prepare an array with object containing ingredient's name and quantity depending on
        // how many people will eat this (selected by user) and the quantity for a fixed amount of people
        // quantity have to number after the coma
        values.recipeIngredients.map((ingredient) =>
            ing.push({  name:ingredient.name,
                        quantity: ingredient.quantity && ingredient.quantity !=="" ?
                    (parseInt(ingredient.quantity) * values.number / values.recipe.peoples).toFixed(2)
                    :""} ));

        let id="";
        await db.collection("utilisateurs").where("pseudo", "==", values.userPseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {id = doc.id;});
        });

        let userRef = db.collection("utilisateurs").doc(id);
        await userRef.update({myList: firebase.firestore.FieldValue.arrayUnion(
            {
                ingredients: ing,
                date: new Date(getDateWithHourMnSeconds(Date.now())),
                recipeName: values.recipe.name}
            )});

        await userRef.get().then((doc) => {
            let user = doc.data();
            dispatch({type: AUTH_USER, payload: user}); // should only update myList, not all user's data
            dispatch({type: SHOW_SNACKBAR, payload: {txt: 'votre liste de course à été mise à jour', variant: "success"}});
        });
    }
    catch(e){
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de l'ajout des ingredients à la liste de course", variant: "error"}});
    };
}
