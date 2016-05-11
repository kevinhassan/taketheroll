var db = require('../config/database');
var table = 'student';
var pk = 'id_Student';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');

var student = {
  getAll: function(req, res){
    var sql = model.selectAll('*',table);
    db.query(sql, function(students,err){
      if(err){
        catchError(res,err);
      }
      else if(students.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Il n'y a pas d'étudiants",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Etudiants trouvées",
          "students": students
        });
      }
    });
},
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,pk,id);
    db.query(sql, function(student,err){
      if(err){
        catchError(res,err);
      }
      else if(student.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Cet étudiant n'existe pas",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Etudiant trouvé",
          "student": student
        });
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
