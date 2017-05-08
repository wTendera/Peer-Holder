
const express = require('express')
const request = require('superagent')
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

    let remoteAddress = req.connection.remoteAddress.split(":")[3]
    peers.push(`${remoteAddress}:${req.body.port}`)
    console.log(`New user connected: ${remoteAddress}:${req.body.port}, currently registered: ${peers.length}`)

    peers.forEach(peer => {
        request.post(`${peer}/peers`).send(peers)
            .then(res => {}, err => console.log("Peer inactive, clean might be needed:", err))
    })

    res.sendStatus(200)
})


app.listen(3010, function () {
    console.log('Example app listening on port 3010!')
})