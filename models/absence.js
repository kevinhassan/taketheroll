var db = require('../config/database');
var table = 'absence';
var pk = 'id_Absence';//Primary key
var model = require('./model');

var absence = {
  getAll: function(req, res){//Student : récupérer son id,Admin: afficher toute absence d'un éléve, ou d'un cours
    var sql = model.selectAll('*',table);
    var result = db.query(sql,function(res,err){
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
    });
    res.send(result);
  },
  getOne: function(req, res){//Récupérer l'id de l'user(student) + celui de l'absence
    var idCourse = req.params.idCourse;
    var idAbsence = req.params.idAbsence;
    var sql = model.selectWhere('*',table,pk,{'id_Course':idCourse,'id_Absence':idAbsence});
    var result = db.query(sql,function(res,err){
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
    });
    res.send(result);
  },
  create: function(req, res){
    var idCourse = req.params.idCourse;
    var newAbsence = {'id_Course':idCourse,'bool_Justify':false};
    var sql = model.create(table,newAbsence);
    var result = db.query(sql,function(res,err){
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
    });
    res.send(result);
  },
  delete: function(req, res){
    var id = req.params.id;
    var sql = model.deleteWhere(table,pk,id);
    var result = db.query(sql,function(res,err){
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
    });
    res.send(result);
  },
  justify: function(req, res){
    var idCourse = req.params.idCourse;
    var idAbsence = req.params.idAbsence;
    var updateData = {'bool_justify':true};//A recupèrer dans le formulaire
    var sql = model.update(table,updateData,pk,id);
    var result = db.query(sql,function(res,err){
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
    });
    res.send(result);;
  }
};
module.exports = absence;
