import { HIDE_SNACKBAR, SHOW_SNACKBAR} from "./type";


/**
 * This function show the snackbar at bottom left of screen
 * @param txt       {string} : txt inside the snackbar
 * @param variant   {string} : defined the color of the snackbar ("error":red,"success":green ...)
 * @return          {function(...[*]=)}
 */
export const showSnackbar = (txt, variant) => async dispatch => {
     dispatch({type: SHOW_SNACKBAR, payload: {txt, variant}});
 };


/**
 * This function will hide the snackbar
 * @returns {function(...[*]=)}
 */
export const hideSnackbar = () => async dispatch => {
    dispatch({type: HIDE_SNACKBAR, payload: {}});
};
