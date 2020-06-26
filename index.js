var express = require('express');
var cors = require('cors')

var app = express();

const port = process.env.PORT || 3000;

var corsOptions = {
    origin: 'https://pudinero-mercadopago-qr.herokuapp.com/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(cors())

app.get('/', cors(corsOptions), function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});