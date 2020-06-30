import React from 'react';
import {Grid} from "@material-ui/core";
import {TextField, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


/**
 * This component contain a number of TextField depending on the number in the array 'arrayField' given in props
 * used for update user page
 */
export default class UpdateUserForm extends React.Component {

    render() {
        const {
            handleSubmit, values, touched, errors, handleChange, arrayField
            //handleBlur, dirty, handleReset, isSubmitting
        } = this.props;
        return (
            <form onSubmit={handleSubmit} style={{marginTop: 20, marginBottom: 20}}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            Informations
                        </Typography>
                    </Grid>
                    {arrayField.map(field => (
                        <Grid item xs={12} sm={10} md={8} lg={6} style={{width: "100%"}} key={field.name}>
                            <TextField
                                fullWidth={true}
                                type={field.type} name={field.name} id={field.name}
                                onChange={handleChange} key={field.name} label={field.label}
                                InputLabelProps={{shrink: true}} variant="outlined"
                                value={values[field.name]}
                                helperText={errors[field.name] && touched[field.name] && errors[field.name]}
                                error={touched[field.name] && Boolean(errors[field.name])}
                            />
                        </Grid>)
                    )
                    }
                    <Grid xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Valider
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}
