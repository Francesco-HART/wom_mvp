import {db} from "../../../Firebase";
import {SHOW_SNACKBAR} from "../../type";


/**
 * This function will add a user if the mail and pseudo isn't already in database
 * @param values    {object}: contain login's and password's values
 * @returns {function(...[*]=)}
 */
export const addUser = ( values ) => async dispatch => {
    let isMailInDatabase = false;
    let isPseudoInDatabase = false;

    //new user data we will add in database if it's possible
    const newUser = {
        email: values.email,
        password: values.password,
        pseudo: values.pseudo,
        ingredients: [],
        recettes: [],
        favoris: []
    };

    try {
        //region check if pseudo or mail is already used
        // this way, we reduce our read quota from firestore at minimum
        await db.collection("utilisateurs").where("pseudo", "==", values.pseudo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                isPseudoInDatabase = true;
            });
        });
        if (!isPseudoInDatabase) {
            await db.collection("utilisateurs").where("email", "==", values.email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    isMailInDatabase = true;
                });
            });
        }
        if (isMailInDatabase) {
            dispatch({type: SHOW_SNACKBAR, payload: {
                    txt: "nous ne pouvons vous ajouté a la base de donnée, le mail est déja saisie",
                    variant: "error"
                }
            })
        }
        else if (isPseudoInDatabase) {
            dispatch({type: SHOW_SNACKBAR, payload: {
                    txt: "nous ne pouvons vous ajouté a la base de donnée, ce pseudo existe déja, choissisez en un autre",
                    variant: "error"
                }
            })
        }
        //endregion

        //region if not, we try to add it in database
        else {
            try {
                //this will add the new user
                await db.collection("utilisateurs").add(newUser).then(function(docRef){
                    dispatch({type: SHOW_SNACKBAR, payload: {txt: "vous êtes désormais inscrit " + values.pseudo, variant: "success"}})
                }).catch(function(error){
                    dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de l'ajout de votre compte à notre base de données", variant: "error"}});
                })
            }
            catch(e){
                dispatch({type: SHOW_SNACKBAR, payload: {txt: "erreur lors de la création de votre compte", variant: "error"}});
            };
        }
        //endregion
    }
    catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de la création de votre compte", variant: "error"}});
    }
}


