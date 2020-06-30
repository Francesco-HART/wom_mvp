import {db} from "../../../Firebase"
import {AUTH_USER, SHOW_SNACKBAR} from "../../type";


/**
 * This function will update user's data from firebase, like password, mail or pseudo
 * (have to be test)
 * @param values    {object}:   values the user want to update
 * @param user      {object}:   user's current data
 * @returns         {function(*): []}
 */
export const updateAccount =  (values , user) => async dispatch => {
    let infoToUpdate = {};
    let isMailInDatabase = false;
    let isPseudoInDatabase = false;

    try {
        let obj = Object.keys(values).length;
        const infoCan = ['password', 'email', 'pseudo'];
        for(let i = 0; i <= Object.keys(values).length; i++) {
            if(infoCan.includes(obj[i]))
                if (values[obj[i]] !== user[obj[i]])
                    infoToUpdate[obj[i]] = values[obj[i]]
        }
        if(values.current_password)
            if (values.current_password !== user.password){
                dispatch({type: SHOW_SNACKBAR, payload: {
                        txt: "Mot de passe actuel incorrect",
                        variant: "error"
                    }
                });
                return false;
            }

        console.log(infoToUpdate);
        //region check if pseudo or mail is already used
        await db.collection("utilisateurs").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (infoToUpdate.email && doc.data().email === values.email) {isMailInDatabase = true;}
                if (infoToUpdate.pseudo && doc.data().pseudo === values.pseudo ) {isPseudoInDatabase = true;}
            });
        });

        if (isMailInDatabase ) {
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
        else {
            let id="";
            await db.collection("utilisateurs").where("pseudo", "==", user.pseudo).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {id = doc.id;});
            });
            let userRef = db.collection("utilisateurs").doc(id);
            /*let newUser = userRef.update({
                "pseudo": values.pseudo,
                "email": values.email,
                "password": values.password
            });*/

            await userRef.get().then((doc) => {
                let user = doc.data();
                dispatch({type: AUTH_USER, payload: user});
                dispatch({type: SHOW_SNACKBAR, payload: {txt: 'profil mis à jour', variant: "success"}});
                //should only change favoris[], not all user data
            });

        }
    }
    catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de la mise a jour de vos données", variant: "error"}});
    }
};


