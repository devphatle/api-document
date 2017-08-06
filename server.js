// ----------- Setup application ------------------
// ----------- Get all tools application need  ----
// ------------------------------------------------

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');

var bodyParser = require('body-parser')
var config = require('./config');


app.use("/assets", express.static(__dirname + "/assets")); // public folder assets
app.use("/views", express.static(__dirname + "/views")); // public folder assets

// --------- Setup express application
app.use(morgan('dev')); // log every request to console
app.set('view engine', 'ejs'); // set up ejs for templating
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// controller  -----------------------------------------
require('./app/controllers/userController.js')(app, express);


// error hadling middleware
app.use(function(err, req, res, next){
  res.status(422).send({ error : err.message });
  
}); 

 app.get('/', function(req, res){
        res.render('index.ejs');
    });

var port = process.env.PORT || 9090; // create port 8181
mongoose.connect(config.database); // connect database
app.listen(port); // server start
console.log('Server node js start with port' + port);