var db = require('../config/database');
var table = 'student';
var pk = 'id';//Primary key
var model = require('./model');

var student = {
  getAll: function(req, res){
    var sql = model.selectAll('*',table);
    var result = db.query(sql);
    res.send(result);
  },
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,pk,id);
    var result=db.query(sql);
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
    var updateData = {'id':4,'name':"kash",'nickname':"kake"};//A recupèrer dans le formulaire
    var sql = model.update(table,updateData,pk,id);
    console.log(sql);
    var result = db.query(sql);//Requête de test
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
    var sql = model.deleteWhere(table,pk,id);
    var result = db.query(sql);
    res.send(result);
  }
};
module.exports = student;
