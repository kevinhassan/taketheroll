var db = require('../config/database');
var table = 'late';
var pk = 'id_Late';//Primary key
var model = require('./model');

var late = {
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
    var newAbsence = {};//Requête de test
    var sql = model.create(table,newStudent);
    var result = db.query(sql);
    res.send(result);
  },
  delete: function(req, res){
    var id = req.params.id;
    var sql = model.deleteWhere(table,pk,id);
    var result = db.query(sql);
    res.send(result);
  },
  justify: function(req, res){
    var id = req.params.id;
    var updateData = {};//A recupèrer dans le formulaire
    var sql = model.update(table,updateData,pk,id);
    var result = db.query(sql);//Requête de test
    res.send(result);
  }
};
module.exports = late;
