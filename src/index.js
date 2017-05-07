
const express = require('express')

const app = express()
const bodyParser = require('body-parser');

const peers = []
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/peers', function (req, res) {
    res.status(200).json(peers)
})

app.post('/register', function (req, res) {

    console.log("New user connected:", req.connection.remoteAddress, ':', req.body.port, "currently registered: ", peers.length)
    peers.push(`${req.connection.remoteAddress}:${req.body.port}`)

    res.sendStatus(200)
})


app.listen(3010, function () {
    console.log('Example app listening on port 3010!')
})