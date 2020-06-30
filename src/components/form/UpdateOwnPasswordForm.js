import React from "react";
import {Grid, IconButton, InputAdornment, FormControl, FormHelperText, InputLabel,
        Typography, Button, OutlinedInput} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

/**
 * This function is used to display a form with password field, used to update user's password
 * @param props {object} : props
 * @return {*}
 * @constructor
 */
const UpdateOwnPasswordForm = (props) => {
    const {values, touched, errors, handleChange/*, isSubmitting*/} = props;

    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownCurrentPassword = (event) => {
        event.preventDefault();
    };

    return (
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        Mot de passe
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={10} md={8} lg={6} style={{width: "100%"}}>
                    <FormControl
                        variant="outlined"
                        error={touched["current_password"] && Boolean(errors["current_password"])}
                        style={{width: "100%"}}
                    >
                        <InputLabel htmlFor="outlined-adornment-current_password">
                            Mot de passe actuel
                        </InputLabel>

                        <OutlinedInput
                            key={"current_password"}
                            id="outlined-adornment-current_password"
                            aria-describedby="pwd-helper-text"
                            name="current_password"
                            type={showCurrentPassword ? "text" : "password"}
                            value={values.current_password}
                            onChange={handleChange("current_password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle current_password visibility"
                                        onClick={handleClickShowCurrentPassword}
                                        onMouseDown={handleMouseDownCurrentPassword}
                                        edge="end"
                                    >
                                        {showCurrentPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={100}
                        />

                        <FormHelperText id="pwd-helper-text">
                            {errors["current_password"] &&
                            touched["current_password"] &&
                            errors["current_password"]}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={10} md={8} lg={6} style={{width: "100%"}}>
                    <FormControl
                        variant="outlined"
                        error={touched["password"] && Boolean(errors["password"])}
                        style={{width: "100%"}}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Mot de passe
                        </InputLabel>

                        <OutlinedInput
                            key={"password"}
                            id="outlined-adornment-password"
                            aria-describedby="pwd-helper-text"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={100}
                        />

                        <FormHelperText id="pwd-helper-text">
                            {errors["password"] && touched["password"] && errors["password"]}
                        </FormHelperText>
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={10} md={8} lg={6} style={{width: "100%"}}>
                    <FormControl
                        variant="outlined"
                        error={touched["confirm_password"] && Boolean(errors["confirm_password"])}
                        style={{width: "100%"}}
                    >
                        <InputLabel htmlFor="outlined-adornment-confirm-password">
                            Confirmation
                        </InputLabel>

                        <OutlinedInput
                            key={"confirm_password"}
                            id="outlined-adornment-confirm-password"
                            aria-describedby="confirm-pwd-helper-text"
                            name="confirm_password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={values.confirm_password}
                            onChange={handleChange("confirm_password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={100}
                        />

                        <FormHelperText id="confirm-pwd-helper-text">
                            {errors["confirm_password"] &&
                            touched["confirm_password"] &&
                            errors["confirm_password"]}
                        </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Valider
                    </Button>
                </Grid>
            </Grid>
    );
};

export default UpdateOwnPasswordForm;

