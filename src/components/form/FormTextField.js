import React from 'react';
import {TextField, Button, Grid} from "@material-ui/core";
import {Form} from "formik";


/**
 * This component contain a number of TextField depending on the number in the array 'arrayField' given in props
 */
export default class FormTextField extends React.Component {

    render(){
        const {
            handleSubmit, values, touched, errors, handleChange, arrayField
            //handleBlur, dirty, handleReset, isSubmitting
        } = this.props;
        return(
            <Form onSubmit={handleSubmit}>
                <Grid container  justify="center" spacing={2}>
                    {arrayField.map(field =>(
                        <Grid item xs={12} md={2} key={field.name}>
                            <Grid
                                container
                                justify='center'>
                                <Grid item>
                                    <TextField type={field.type} name={field.name} id={field.name}
                                               onChange={handleChange} key={field.name} label={field.label}
                                               InputLabelProps={{shrink: true}} variant="outlined"
                                               value={values[field.name]}
                                               helperText={errors[field.name] && touched[field.name] && errors[field.name]}
                                               error={touched[field.name] && Boolean(errors[field.name])}
                                    />
                        </Grid>
                            </Grid>
                        </Grid>)
                    )
                    }
                    <Grid xs={12}>
                        <Grid
                            container
                            justify='center'>
                                <Grid item>
                                    <Button type={"submit"}>Valider</Button>
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        );
    }
}
