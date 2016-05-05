require('dotenv').config();// Modifier les variables d'environnement
var express = require("express");
var path = require('path');
var app = express();
var pg = require('pg');//postgres module
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var favicon = require('express-favicon');
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité)
var logger = require('morgan'); //Log module

app.use(logger('dev'));
app.use(bodyParser.json());

/*Connect to DB postgres*/
var db = JSON.parse(process.env.DB_URL);//on parse l'url
db = 'postgres://'+db.DB_USER+':'+db.DB_PASS+'@'+db.DB_HOST+'/'+db.DB_NAME;
var client = new pg.Client(db);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  else{
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].theTime);
      client.end();
    });
  }
});
app.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Vous êtes à l\'accueil');
});
app.get('/auth', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Veuillez vous authentifier');
});
app.get('/student/:id', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Bienvenu étudiant n°'+req.params.id);
});
app.get('/teacher/:id', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Bienvenu professeur n°'+req.params.id);
});
app.get('/secretariat/:id', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Bienvenu secretariat n°'+req.params.id);
});
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Erreur 404, Page introuvable !');
});

app.listen(8080,function(){
  console.log("Le serveur est en cours d'execution");
});
