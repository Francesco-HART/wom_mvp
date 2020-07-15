import {SHOW_SNACKBAR} from "./type";

export const sendSms = (message) => async dispatch => {
    console.log('iciiii');
    
    await fetch('http://localhost:5000/api/sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                dispatch({
                    type: SHOW_SNACKBAR,
                    payload: {txt: " Vous devriez recevoir le liens vers votre ticket par sms", variant: "success"}
                })
            }
        }).catch(err => {
            console.log(err)
        })
}