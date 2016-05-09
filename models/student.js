var db = require('../config/database');
var table = 'student';
var pk = 'id_Student';//Primary key
var model = require('./model');

var student = {
  getAll: function(req, res){
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
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,pk,id);
    var result = db.query(sql,function(res,err){
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
    });;
    res.send(result);
  },
  create: function(req, res){
    var newStudent = req.body;
    var sql = model.create(table,newStudent);
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
  update: function(req, res){
    var id = req.params.id;
    var updateData = req.body;
    var sql = model.update(table,updateData,pk,id);
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
  }
};
module.exports = student;
