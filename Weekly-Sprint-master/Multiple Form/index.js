var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser');
//var request = require('request');
//var mysql = require('mysql');
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 6500));
app.use(express.static(__dirname + '/public'));
app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, "views")
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.get('/', function(req, res) {
    console.log("app is")
    res.render('home');
});
var form = require('./routes/form-route')
app.use('/form', form)
app.listen(6500, function() {
    console.log('Node app is running on port', app.get('port'));
});
module.exports = app;