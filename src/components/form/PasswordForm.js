import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Grid, OutlinedInput, InputAdornment, IconButton, FormControl, InputLabel, FormHelperText} from "@material-ui/core";


/**
 * This function is used for a simple password form
 * @param errors
 * @param values
 * @param touched
 * @param handleChange
 * @return {*}
 * @constructor
 */
export default function PasswordForm({errors, values, touched, handleChange}) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const password = [
        {
            name: "password",
            label: "Mot de passe",
            type: showPassword ? "string" : "password",
        },
        {
            name: "confirm_password",
            label: "Confirmation",
            type: showConfirmPassword ? "string" : "password",
        },
    ];

    return (
        <>
            {password.map((elem) => (
                <Grid item xs={12} sm={6} lg={3} key={elem.name}>
                    <FormControl
                        variant="outlined"
                        error={touched[elem.name] && Boolean(errors[elem.name])}
                        style={{ width: "100%" }}
                    >
                        <InputLabel htmlFor="outlined-adornment-current_password">
                            {elem.label}
                        </InputLabel>
                        <OutlinedInput
                            key={elem.name}
                            variant="outlined"
                            name={elem.name}
                            label={elem.label}
                            type={elem.type}
                            value={values[elem.name]}
                            error={touched[elem.name] && Boolean(errors[elem.name])}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={
                                            elem.name === "password"
                                                ? handleClickShowPassword
                                                : handleClickShowConfirmPassword
                                        }
                                        onMouseDown={
                                            elem.name === "password"
                                                ? handleMouseDownPassword
                                                : handleMouseDownConfirmPassword
                                        }
                                        edge="end"
                                    >
                                        {elem.name === "password" ? (
                                            !showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )
                                        ) : !showConfirmPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="pwd-helper-text">
                            {errors[elem.name] && touched[elem.name] && errors[elem.name]}
                        </FormHelperText>
                    </FormControl>
                </Grid>
            ))}
        </>
    );
}
