import React from 'react';
import PasswordForm from "./PasswordForm";
import {TextField, Button, Grid} from "@material-ui/core";


/**
 * This component contain a number of TextField depending on the number in the array 'arrayField' given in props
 */
export default class InscriptionForm extends React.Component {

    render() {
        const {
            handleSubmit, values, touched, errors, handleChange, arrayField
            //handleBlur, dirty, handleReset, isSubmitting
        } = this.props;
        return (
            <form onSubmit={handleSubmit} style={{margin: 50}}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            {arrayField.map(field => (
                                <Grid item xs={12} sm={6} lg={3} key={field.name}>
                                    <TextField type={field.type} name={field.name} id={field.name}
                                               fullWidth={true}
                                               onChange={handleChange} key={field.name} label={field.label}
                                               InputLabelProps={{shrink: true}} variant="outlined"
                                               value={values[field.name]}
                                               helperText={errors[field.name] && touched[field.name] && errors[field.name]}
                                               error={touched[field.name] && Boolean(errors[field.name])}
                                    />
                                </Grid>)
                            )
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Valider
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}
