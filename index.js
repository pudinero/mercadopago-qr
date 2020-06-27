var express = require('express');
var cors = require('cors');
var mercadopago = require('mercadopago');
const fs = require('fs');
const bodyParser = require('body-parser');
var fetch = require('node-fetch');

var app = express();

const port = process.env.PORT || 3000;

var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "optionsSuccessStatus": 204
}

var lastBody = null
var collector_id = "586728271"

mercadopago.configure({
    access_token: "APP_USR-7026946692817220-061822-8b7c9e20631faac22d9e4cfa92a37265-586728271",
    collector_id: "586728271",
    country_id: "MLA"
});

app.use(express.static('public'));
app.use(cors())
app.use(bodyParser());

app.get('/', cors(corsOptions), function (req, res) {
    res.render('index.pug', { title: 'Hey', message: 'Hello there!'});
});

app.post('/api/notifications', function (req, res) {

    lastBody = req.body

    fs.writeFile('notifications.txt', req.body, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('Notification saved!');
        console.log(req.body)
    });

    res.sendStatus(200)
});


app.get('/api/notifications/get', function (req, res) {
    console.log(lastBody)
    res.send(lastBody)
});

app.post('/api/order/create', function (req, res) {
    var data = req.body

    var urlapi = "https://api.mercadopago.com/mpmobile/instore/qr/" + collector_id + "/" + data.external_id + "?access_token=" + mercadopago.configurations.getAccessToken()
    
    console.log(data.json)

    fetch(urlapi, {
        method: 'POST',
        body: JSON.stringify(data.json),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => res.send(error))
    .then(response => res.send(response));
});

app.post('/api/order/delete', function (req, res) {
    var data = req.body

    var urlapi = "https://api.mercadolibre.com/mpmobile/instore/qr/" + collector_id + "/" + data.external_id + "?access_token=" + mercadopago.configurations.getAccessToken()
    
    console.log(urlapi)
    console.log(data)

    fetch(urlapi, {
        method: 'DELETE',
    })
    .then(res => res.send(res))
    .catch(error => res.send(error))
    .then(response => res.send(response));
});

app.post('/api/order/status', function (req, res) {
    var data = req.body

    var urlapi = "https://api.mercadopago.com/merchant_orders/search?external_reference=" + data.external_reference + "&access_token=" + mercadopago.configurations.getAccessToken()
    
    fetch(urlapi, {
        method: 'GET',
    })
    .then(res => res.json())
    .catch(error => res.send(error))
    .then(response => res.send(response));
});

app.post('/api/pos/create', function (req, res) {
    var urlapi = "https://api.mercadopago.com/pos?access_token=" + mercadopago.configurations.getAccessToken()
    var data = req.body

    data.fixed_amount = true
    data.category = 621102
    console.log(data)

    fetch(urlapi, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => res.send(error))
    .then(response => res.send(response));
});

app.post('/api/pos/get', function (req, res) {
    console.log(req.body)

    var data = req.body

    var urlapi = "https://api.mercadopago.com/pos?external_id=" + data.external_id + "&access_token=" + mercadopago.configurations.getAccessToken()
    
    fetch(urlapi, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => res.send(error))
    .then(response => res.send(response));
});

app.post('/api/store/create', function (req, res) {
    console.log(req.body)

    var data = req.body

    var urlapi = "https://api.mercadopago.com/users/" + collector_id + "/stores?access_token=" + mercadopago.configurations.getAccessToken()
    
    fetch(urlapi, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => res.send(error))
    .then(response => res.send(response));
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});