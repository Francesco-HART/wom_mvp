import {createMuiTheme} from "@material-ui/core/styles";
import {DARK_PRIMARY, DARK_SECONDARY, LIGHT_PRIMARY, LIGHT_SECONDARY} from "../../resources/colors";

export const theme = (preferences) =>
    createMuiTheme({
        palette: {
            type: preferences,
            background : {
                default : '#a5e8d3'
            },
    
            primary: {main: DARK_PRIMARY},
            secondary: {main:  DARK_SECONDARY}
        },
        MuiButton: {
            raisedPrimary: {
              color: 'white',
            },
          },
          typography: {
            "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
           }
    })
