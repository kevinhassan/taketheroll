var db = require('../config/database');
var student = {
  getAll: function(req, res){
      result = db.query('SELECT * FROM student');
      res.json(result);
  },
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    db.query('SELECT * FROM student WHERE id='+id);
    res.json(result);
  },
  create: function(req, res){
    var newStudent = req.body;
    result = db.query('INSERT INTO student'
              + ' (nom, prenom, sexe, numTel, email, adresse, dateNaissance, nomUtilisateur, motDepasse)'
              + ' VALUES '
              + ' ($1, $2, $3, $4, $5, $6, $7, $8)'
           , [newStudent.nom, newStudent.prenom, newStudent.sexe, newStudent.numTel, newStudent.email,
             newStudent.adresse, newStudent.dateNaissance, newStudent.email, hash(dateNaissance)]);//On initialise le mdp à la date de naissance
             res.json(result);
  },
  update: function(req, res){
    var id = req.params.id;
    var updateData = req.body;
    db.query('UPDATE student'
              + 'SET nom=updateData.nom, prenom=updateData.prenom , sexe=updateData.sexe,'
              +'numTel=updateData.numTel, email=updateData.email , adresse=updateData.adresse,'
              +'dateNaissance= updateData.dateNaissance, nomUtilisateur=updateData.email'
              + 'WHERE id='
              + id);
              res.json(result);
  },
  delete: function(req, res){
    var id = req.params.id;
    db.query('DELETE FROM student'
              + 'WHERE id='
              + id);
    res.json(result);
  }
};
module.exports = student;
