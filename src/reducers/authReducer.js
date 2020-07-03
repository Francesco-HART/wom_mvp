import { AUTH_USER} from "../actions/type";

const INITIAL_STATE = null;

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return action.payload;
        // case ADD_FAVORITE:
        //     return {
        //         ...state, favoris : [...state.favoris, action.payload]
        //     };

        // case DEL_FAVORITE:
        //     const ind = state.favoris.indexOf(action.payload);
        //     let nextstate = state.favoris.filter( (item, index) => index !== ind);

        //     return {...state, favoris: nextstate};
        default:
            return state;
    }
}
