const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(pino);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

app.post('/api/sms', async (req, res) => {
    res.header('Content-Type', 'application/json');
    await client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({success: true}));
        })
        .catch(err => {
            console.log(err)
            res.send(JSON.stringify({success: false}));
        });
});


const HTTP_PORT = process.env.PORT || 3001;
app.listen(HTTP_PORT, () => console.log('Server running on port ' + HTTP_PORT))
//app.get("/api/action/:id", requireAuth, Action.getOne);

module.exports = app;