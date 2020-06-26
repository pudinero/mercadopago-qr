var express = require('express');

var app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});