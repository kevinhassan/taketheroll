var db = require('../config/database');
var table = 'user';
var pk = 'id_User';//Primary key
var model = require('./model');

var user = {
  getOne: function(req, res){
    //On récupère l'id en fonction de l'heure de cours et de la date d'aujourd'hui
    //Le formatage de l'heure se fait avec momentjs
    db.query('SELECT * FROM user WHERE ');
  }
};
module.exports = user;
