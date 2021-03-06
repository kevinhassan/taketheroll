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
    var idStudent = req.params.idStudent;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,{"id_Student":idStudent});
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
  create: function(req, res){
    var sql = model.create(table,req);
    db.query(sql, function(res,err){
      if(err){
        catchError(res,err);
      }
    });
  },
  update: function(req, res){
    var updateData = req.body;
    var sql = model.update(table,updateData, {"id_Student":req.params.idStudent,
                                              "id_Late":req.params.idLate
                                              });

    db.query(sql, function(student,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(201).send({
          "status": 201,
          "message": "Etudiant mis à jour",
          "student": student
        });
      }
    });
  },
  delete: function(req, res){
    var idStudent = req.params.idStudent;
    var sql = model.deleteWhere(table,pk,idStudent);
    db.query(sql,function(result,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(201).send({
          "status": 201,
          "message": "Etudiant supprimé"
        });
      }
    });
  }
};
module.exports = student;
