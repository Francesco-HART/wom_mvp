import {AUTH_USER} from "../actions/type";

const INITIAL_STATE = null;

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return action.payload;
        default:
            return state;
    }
}
