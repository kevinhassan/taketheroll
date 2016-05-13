var db = require('../config/database');
var table = 'teacher';
var pk = 'id_Teacher';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');

var teacher = {
  getAll: function(req, res){
    var sql = model.selectAll('*',table);
    db.query(sql, function(teacher,err){
      if(err){
        catchError(res,err);
      }
      else if(teacher.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Il n'y a pas de professeur",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Professeurs trouvées",
          "teacher": teacher
        });
      }
    });
},
  getOne: function(req, res){
    var idTeacher = req.params.idTeacher;//On récupère l'id de l'professeur à afficher
    var sql = model.selectWhere('*',table,{"id_Teacher":idTeacher});
    db.query(sql, function(teacher,err){
      if(err){
        catchError(res,err);
      }
      else if(teacher.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Ce professeur n'existe pas",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Professeur trouvé",
          "teacher": teacher
        });
      }
    });
  },
  create: function(req, res){
    var newTeacher = req;
    var sql = model.create(table,newTeacher);
    db.query(sql, function(teacher,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(201).send({
          "status": 201,
          "message": "Professeur créé"
        });
      }
    });
  },
  update: function(req, res){
    var updateData = req.body;
    var sql = model.update(table,updateData, {"id_Teacher":req.params.idTeacher
                                              });

    db.query(sql, function(teacher,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(201).send({
          "status": 201,
          "message": "Professeur mis à jour",
          "teacher": teacher
        });
      }
    });
  },
  delete: function(req, res){
    var idTeacher = req.params.idTeacher;
    var sql = model.deleteWhere(table,pk,idTeacher);
    db.query(sql,function(result,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(201).send({
          "status": 201,
          "message": "Professeur supprimé"
        });
      }
    });
  }
};

module.exports = teacher;
