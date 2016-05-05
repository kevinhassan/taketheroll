require('dotenv').config();// Modifier les variables d'environnement

var favicon = require('express-favicon');
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité)
var pg = require('pg');//postgres module
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// La liste des routes de l'application
app.use('/', routes);
// Si la page n'existe pas envoyer une erreur 404
app.use(function(req, res, next) {
  res.status(404);
  next();
});

// Démarrer le server
app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
