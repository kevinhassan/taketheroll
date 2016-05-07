var db = require('../config/database');
var absence = {
  getAll: function(req, res){
    /*Je regarde dans l'objet utilisateur mon role
    Si je suis étudiant -> je n'affiche que les absences de mon id
    Sinon j'affiche tous*/
      result = db.query('SELECT * FROM absence');
      res.json(result);
  },
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    db.query('SELECT * FROM absence WHERE id='+id);
    res.json(result);
  },
  create: function(req, res){
    var newAbsence = req.body;
    result = db.query('INSERT INTO absence'
              + ' (idStudent, idCours)'
              + ' VALUES '
              + ' ($1, $2)'
           , [newAbsence.idStudent, newAbsence.idCours]); //On crée une absence pour l'étudiant sur CE cours
    res.json(result);
  },
  justify: function(req, res){
    var id = req.params.id;
  },
  add: function(req, res){
  },
};
module.exports = absence;
