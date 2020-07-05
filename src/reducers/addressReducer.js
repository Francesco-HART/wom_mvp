import {ADDRESS} from "../actions/type";

const INITIAL_STATE = null;

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADDRESS:
            return action.payload;
        default:
            return state;
    }
}
