import {db} from "../../../Firebase";
import {SHOW_SNACKBAR} from "../../type";


/**
 * This function will add a user if the mail and pseudo isn't already in database
 * @param values    {object}: contain login's and password's values
 * @returns         {function(...[*]=)}
 */
export const createUser = (values) => async dispatch => {
    let isMailInDatabase = false;
    let isPseudoInDatabase = false;
    const types = ['admin', 'user', 'company'];

    //new user data we will add in database if it's possible
    const newUser = {
        email: values.email,
        password: values.password,
        pseudo: values.pseudo,
        type: values.type,
        ingredients: [],
        recettes: [],
        favoris: [],
        posts: []
    };

    try {
        const isTypeAccepted = types.includes(values.type);
        if (!isTypeAccepted) {
            dispatch({
                type: SHOW_SNACKBAR,
                payload: {txt: 'Le type doit être user, admin ou company', variant: "error"}
            });
        }
        else {
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
                dispatch({
                    type: SHOW_SNACKBAR, payload: {
                        txt: "nous ne pouvons vous ajouté a la base de donnée, le mail est déja saisie",
                        variant: "error"
                    }
                });
            } else if (isPseudoInDatabase) {
                dispatch({
                    type: SHOW_SNACKBAR, payload: {
                        txt: "nous ne pouvons vous ajouté a la base de donnée, ce pseudo existe déja, choissisez en un autre",
                        variant: "error"
                    }
                });
            }
            //endregion

            //region if not, we try to add it in database
            else {
                try {
                    //this will add the new user
                    await db.collection("utilisateurs").add(newUser).then(function (docRef) {
                        dispatch({
                            type: SHOW_SNACKBAR,
                            payload: {txt: "vous êtes désormais inscrit " + values.pseudo, variant: "success"}
                        });
                    }).catch(function (error) {
                        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur s'est produite lors de l'ajout de l'utilisateur", variant: "error"}});
                    })
                } catch (e) {
                    dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur s'est produite lors de l'ajout de l'utilisateur", variant: "error"}});
                }
            }
            //endregion
        }

    } catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur s'est produite lors de la création de l'utilisateur", variant: "error"}});
    }
}


