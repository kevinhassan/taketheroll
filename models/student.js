var db = require('../config/database');
var student = {
  getAll: function(req, res){
    var result = db.query('SELECT * FROM student');
    res.send(result);
  },
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var result=db.query('SELECT * FROM student WHERE id='+id);
    res.send(result);
  },
  create: function(req, res){
    var result = db.query("INSERT INTO student (id,name,nickname) VALUES("+req.body.id+",'"+req.body.name+"','"+req.body.nickname+"')");//Requête de test
    res.send(result);
    /*var result = db.query('INSERT INTO student'
              + ' (nom, prenom, sexe, numTel, email, adresse, dateNaissance, nomUtilisateur, motDepasse)'
              + ' VALUES '
              + ' ($1, $2, $3, $4, $5, $6, $7, $8)'
           , [newStudent.nom, newStudent.prenom, newStudent.sexe, newStudent.numTel, newStudent.email,
             newStudent.adresse, newStudent.dateNaissance, newStudent.email, hash(newStudent.dateNaissance)]);//On initialise le mdp à la date de naissance
    */
  },
  update: function(req, res){
    var id = req.params.id;
    var result = db.query('UPDATE student'+ " SET id="+req.body.id+",name='"+req.body.name+"',nickname='"+req.body.nickname+"' WHERE id="+ id);//Requête de test
    res.send(result);
    /*db.query('UPDATE student'
              + 'SET nom=updateData.nom, prenom=updateData.prenom , sexe=updateData.sexe,'
              +'numTel=updateData.numTel, email=updateData.email , adresse=updateData.adresse,'
              +'dateNaissance= updateData.dateNaissance, nomUtilisateur=updateData.email'
              + 'WHERE id='
              + id);*/
  },
  delete: function(req, res){
    var id = req.params.id;
    var result = db.query('DELETE FROM student WHERE id='+ id);
    res.send(result);
  }
};
module.exports = student;
