import {SHOW_SNACKBAR} from "./type";

export const sendSms = (message) => async dispatch => {
    await fetch('/api/sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                /*dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: " Vous devriez recevoir le liens vers votre tickets", variant: "sucess"}
                })*/
            }
        }).catch(err => {
            console.log(err.message)
        })
}