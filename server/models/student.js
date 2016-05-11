var db = require('../config/database');
var table = 'student';
var pk = 'id_Student';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');

var student = {
  getAll: function(req, fn){
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
  getOne: function(req, fn){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,pk,id);
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
    var newStudent = req.body;
    var sql = model.create(table,newStudent);
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
  update: function(req, fn){
    var id = req.params.id;
    var updateData = req.body;
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
  },
  delete: function(req, fn){
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
  }
};
module.exports = student;
