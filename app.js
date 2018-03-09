require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));


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
})