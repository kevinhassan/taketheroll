var db = require('../config/database');
var table = 'late';
var pk = 'id_Late';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');
var student = require('./student');
var course = require('./course');

var late = {
  getAll: function(req, res){
    if(req.params.idCourse != undefined){//Liste toute les retards d'un cours
      var sql = 'SELECT * FROM '+ table+
                ' WHERE "id_Course"='+req.params.idCourse;
    }
    else if(req.params.idStudent != undefined){//Liste toute les retards d'un étudient
      var sql = 'SELECT * FROM '+ table+
                ' WHERE "id_Student"='+req.params.idStudent;
    }
    else {//Liste ses retards (étudient)
      //On récupère l'id_User de l'étudiant
      //var sql = 'SELECT * FROM '+ table+' WHERE "id_Student"='+idStudent);
    }
    db.query(sql, function(lates,err){
      if(err){
        catchError(res,err);
      }
      else if(lates.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Il n'y a pas de retard",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Retards trouvées",
          "lates": lates
        });
      }
    });
  },
  getOne: function(req, res){//Récupérer une absence
    if(req.params.idCourse != undefined && req.params.idLate != undefined){//Le secrétariat affiche le retard dans un cours
      var sql = 'SELECT * FROM '+table+
                ' WHERE '+'"id_Late"'+'='+req.params.idLate+
                ' AND '+'"id_Course"'+'='+req.params.idCourse;
    }
    else if(req.params.idLate!= undefined && req.params.idStudent!= undefined){//Le secrétariat affiche le retard par rapport à un étudiant
      var sql = 'SELECT * FROM '+table+
                ' WHERE '+'"id_Late"'+'='+req.params.idLate+
                ' AND '+'"id_Student"'+'='+req.params.idStudent;
    }
    else{//L'étudiant affiche son retard
      //Récupérer l'id dans le tokken
      //var sql= 'SELECT * FROM '+table+' WHERE '+'"id_Student"'+'='+req.params.idStudent;
    }
    db.query(sql, function(late,err){
      if(err){
        catchError(res,err);
      }
      else if(absences.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Il n'y a pas de retard",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Retard trouvé",
          "late": late
        });
      }
    });
  },
  create: function(req, res){//Crée absence après l'appel
    if(req.params.idCourse != undefined && req.body.idStudent != undefined){
      var sql = 'INSERT INTO '+table+' ("id_Course"'+',"id_Student")'+
                ' VALUES ("'+req.params.idCourse+'",'+req.body.idStudent+')';
    }
    db.query(sql, function(late,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(200).send({
          "status": 201,
          "message": "Retard créé",
          "late": late
        });
      }
    });
  },
  delete: function(req, res){
    var id = req.params.id;
    var sql = 'DELETE FROM '+table+' WHERE "'+pk+'"='+id;
    db.query(sql,function(late,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Retard supprimé",
          "absence": late
        });
      }
    });
  },
  justify: function(req, res){
    if(req.params.idCourse != undefined && req.params.idLate != undefined){//Le secrétariat passe l'absence a justifiee après avoir selectionne l'absence concernée dans le cours
      var sql = 'UPDATE '+table+' SET "bool_Justify" = true'+
                ' WHERE "id_Course"='+req.params.id_Course+
                ' AND "id_Late"='+req.params.idLate;
    }
    else if(req.params.idStudent != undefined && req.params.idLate != undefined){//Crée une absence en passant par l'éléve
      var sql = 'UPDATE '+table+' SET "bool_Justify" = true'+
                ' WHERE "id_Student"='+req.params.idStudent+
                ' AND "id_Late"='+req.params.idLate;
    }
    db.query(sql,function(late,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Absence devient justifiée"
        });
      }
    });
  }

};
module.exports = late;
