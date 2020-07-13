import {ADDRESS, ADDRESS_CANCEL} from "../actions/type";

const INITIAL_STATE = null;

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADDRESS:
            return action.payload;
        case ADDRESS_CANCEL:
            return null;
        default:
            return state;
    }
}
