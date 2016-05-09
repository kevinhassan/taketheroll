var db = require('../config/database');
var table = 'course';
var pk = 'id_Course';//Primary key
var model = require('./model');
var moment = require('moment');//Gérer les heures de manière intelligente

var course = {
  getOne: function(req, res){
    //On récupère l'id en fonction de l'heure de cours et de la date d'aujourd'hui
    //Le formatage de l'heure se fait avec momentjs
    db.query('SELECT * FROM course WHERE date='+moment().format('L')
    +'AND'
    + moment().format('LT') + 'BETWEEN'+ 'HeureDebut AND HeureFin');
  }
};
module.exports = course;
