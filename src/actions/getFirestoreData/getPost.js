import {db} from "../../Firebase";
import {SHOW_SNACKBAR} from "../type";


/**
 * This function get all post from firestore
 * @return {function(...[*]=)}  posts' data
 */
export const getPost = () => async dispatch => {
    let posts = [];
    try {
        await db.collection("destockage_post").where('date_end', '>=', new Date(Date.now())  ).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
        });
    } catch (e) {
        dispatch({type: SHOW_SNACKBAR, payload: {txt: "une erreur est survenue lors de la récupération des posts", variant: "error"}});
    }
    return posts;
};
