import { SHOW_SNACKBAR, HIDE_SNACKBAR } from "../actions/type";

export default function(
    state = { show: false, txt: "", variant: "info" },
    action
) {
    switch (action.type) {
        case SHOW_SNACKBAR:
            return {
                show: true,
                txt: action.payload.txt,
                variant: action.payload.variant
            };
        case HIDE_SNACKBAR:
            return {
                show: false,
                txt: "",
                variant: "info"
            };
        default:
            return state;
    }
}
