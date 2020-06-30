import {createMuiTheme} from "@material-ui/core/styles";
import {DARK_PRIMARY, DARK_SECONDARY, LIGHT_PRIMARY, LIGHT_SECONDARY} from "../../ resources/colors";

export const theme = (preferences) =>
    createMuiTheme({
        palette: {
            type: preferences,
            primary: {main: preferences === 'dark' ? DARK_PRIMARY : LIGHT_PRIMARY},
            secondary: {main: preferences === 'dark' ? DARK_SECONDARY : LIGHT_SECONDARY}
        }
    })
