var db = require('../config/database');
var table = 'absence';
var pk = 'id_Absence';//Primary key

var model = require('./model');
var student = require('./student');
var course = require('./course');

var absence = {
  getAll: function(req, res){
    if(typeof req.params.idStudent !== 'undefined' && req.params.idStudent){//Cas de l'administration
      var sql = model.selectWhere('*',table,student.pk,req.params.idStudent);
    }
    else{//Cas de l'étudiant
      //Récupérer l'id de l'étudiant connécté
      var sql = model.selectWhere('*',table,student.pk,req.params.idStudent);
    }
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
    var idStudent = req.params.idStudent;
    var newAbsence = {'id_Course':idCourse,'bool_Justify':false,'id_Student':idStudent};
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
    var idAbsence = req.params.idAbsence;
    var updateData = {'bool_justify':true};//A recupèrer dans le formulaire
    var sql = model.update(table,updateData,pk,idAbsence);
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
