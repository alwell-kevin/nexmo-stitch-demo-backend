require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

const nexmoIntegration = require('./integrations/nexmo.js');

app.use(bodyParser.json({
    type: 'application/json'
}));

app.all('/createuser', function (req, res) {
    console.log("IN CREATE USER: ", req.body)

    nexmoIntegration.createUser(req.body.query.userName);
    res.sendStatus(200);
})

app.all('/createconv', function (req, res) {
    console.log("HERE")
    res.sendStatus(200);
})

app.all('/addusertoconv', function (req, res) {
    res.sendStatus(200);
});

app.all('/removeuserfromconv', function (req, res) {
    res.sendStatus(200);
});

app.all('/answer', function (req, res) {
    console.log("HERE")
    res.sendStatus(200);
})

app.all('/event', function (req, res) {
    console.log("HERE")
    res.sendStatus(200);
})

// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
    nexmoIntegration.createClientInstance();
    //nexmoIntegration.createUser("kevin@aol.com");
})