var db = require('../config/database');
var table = 'late';
var pk = 'id_Late';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');
var student = require('./student');
var course = require('./course');

var late = {
  getAll: function(req, fn){//Student : récupérer son id,Admin: afficher toute retard d'un éléve, ou d'un cours
    var sql = model.selectAll('*',table);
    db.query(sql,function(result,err){
      if(err){
        console.error(err);
        return fn(null,err);
      }
      else{
        return fn(result,null);
      }
    });
  },
  getOne: function(req, fn){//Récupérer l'id de l'user(student) + celui du retard
    var idCourse = req.params.idCourse;
    var idLate = req.params.idLate;
    var sql = model.selectWhere('*',table,pk,{'id_Course':idCourse,'id_Late':idLate});
    db.query(sql,function(result,err){
      if(err){
        console.error(err);
        return fn(null,err);
      }
      else{
        return fn(result,null);
      }
    });
  },
  create: function(req, fn){
    var idLate = req.params.idLate;
    var newLate = {'id_Late':idLate,'bool_Justify':false};
    var sql = model.create(table,newAbsence);
    db.query(sql,function(result,err){
      if(err){
        console.error(err);
        return fn(null,err);
      }
      else{
        return fn(result,null);
      }
    });
  },
  delete: function(req, res){
    var id = req.params.id;
    var sql = model.deleteWhere(table,pk,id);
    db.query(sql,function(result,err){
      if(err){
        console.error(err);
        return fn(null,err);
      }
      else{
        return fn(result,null);
      }
    });
  },
  justify: function(req, res){
    var idCourse = req.params.idCourse;
    var idLate = req.params.idLate;
    var updateData = {'bool_justify':true};//A recupèrer dans le formulaire
    var sql = model.update(table,updateData,pk,id);
    db.query(sql,function(result,err){
      if(err){
        console.error(err);
        return fn(null,err);
      }
      else{
        return fn(result,null);
      }
    });
  }
};
module.exports = late;
