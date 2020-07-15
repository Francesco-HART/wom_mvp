import {combineReducers} from "redux";
import authReducer from "./authReducer";
import snackbarReducer from "./snackbarReducer";
import addressReducer from "./addressReducer";
//import preferencesReducer from "./preferencesReducer";

export default combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    address: addressReducer
});


