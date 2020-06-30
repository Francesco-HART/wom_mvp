import React, {Component} from "react";
import {KeyboardDateTimePicker} from "@material-ui/pickers";

/**
 * This class is used to display an input specific for dates
 */
class MyDateTimePicker extends Component {
    render() {
        const {
            onChange,
            value,
            name,
            minDate,
            keyboard,
            disableFuture,
            disablePast,
            placeholder,
            inputVariant,
        } = this.props;

        return (
            <KeyboardDateTimePicker
                minDate={minDate}
                ampm={false}
                allowKeyboardControl={true}
                cancelLabel="Annuler"
                clearable={true}
                clearLabel="Réinitialiser"
                disableFuture={disableFuture}
                disablePast={disablePast}
                emptyLabel=""
                format="d MMM yyyy HH:mm"
                inputVariant={inputVariant}
                invalidDateMessage="Format de date invalide"
                invalidLabel="Date invalide"
                keyboard={keyboard}
                minutesStep={1}
                name={name}
                okLabel="Valider"
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
        );
    }
}

export default MyDateTimePicker;
