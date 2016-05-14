var db = require('../config/database');
var table = 'absence';
var pk = 'id_Absence';//Primary key
var catchError = require('../config/catchError').catchError;
var model = require('./model');
var student = require('./student');
var course = require('./course');
var tokenInspector = require('../auth/config/tokenInspector');

var absence = {
  /*
    Admin: Afficher toutes les absences
    Eleve: Afficher toutes ses absences
  */
  getAll: function(req,res){
      if(req.params.idCourse != undefined){//On liste toutes les absences d'un cours
        var sql = model.selectWhere('*',table,{"id_Course":req.params.idCourse})
        /*var sql = 'SELECT * FROM '+table+
                  ' WHERE '+'"id_Course"'+'='+req.params.idCourse;*/
      }
      else if(req.params.idStudent!= undefined){//On liste par rapport à un étudiant
        var sql = model.selectWhere('*',table,{"id_Student":req.params.idStudent})
        /*var sql = 'SELECT * FROM '+table+
                  ' WHERE '+'"id_Student"'+'='+req.params.idStudent;*/
      }
      else{//L'étudiant liste ses absences
        var idStudent = tokenInspector.getUserId(tokenInspector.getToken(req));
        var sql = model.selectWhere('*', table,{"id_Student":idStudent});
        /*var sql = 'SELECT * FROM '+table+
                  ' WHERE '+'"id_Student"'+'='+idStudent;*/
      }
      db.query(sql, function(absences,err){
        if(err){
          catchError(res,err);
        }
        else if(absences.length == 0){
          res.status(200).send({
            "status": 200,
            "message": "Il n'y a pas d'absence",
          });
        }
        else{
          res.status(200).send({
            "status": 200,
            "message": "Absences trouvées",
            "absences": absences
          });
        }
      });
  },
  getOne: function(req, res){//Récupérer une absence
    if(req.params.idCourse != undefined && req.params.idAbsence!= undefined){//Le secrétariat affiche l'absence dans un cours
    var sql = model.selectWhere('*',table,{"id_Course":req.params.idCourse,
                                           "id_Absence":req.params.idAbsence
                                          });
      /*var sql = 'SELECT * FROM '+table+
                ' WHERE '+'"id_Course"'+'='+req.params.idCourse+
                ' AND '+'"id_Absence"'+'='+req.params.idAbsence;*/
    }
    else if(req.params.idAbsence!= undefined && req.params.idStudent!= undefined){//Le secrétariat affiche l'absence par rapport à un étudiant
    var sql = model.selectWhere('*',table,{"id_Absence":req.params.idAbsence,
                                           "id_Student":req.params.idStudent
                                          });
    /*var sql = 'SELECT * FROM '+table+
              ' WHERE '+'"id_Absence"'+'='+req.params.idAbsence+
              ' AND '+'"id_Student"'+'='+req.params.idStudent;*/
    }
    else{//L'étudiant affiche son absences
      var idStudent = tokenInspector.getUserId(tokenInspector.getToken(req));
      var sql = model.selectWhere('*',table,{"id_Student":idStudent});
      //var sql= 'SELECT * FROM '+table+' WHERE '+'"id_Student"'+'='+idStudent;
    }
    db.query(sql, function(absence,err){
      if(err){
        catchError(res,err);
      }
      else if(absence.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Il n'y a pas d'absence",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Absence trouvée",
          "absence": absence
        });
      }
    });
  },
  create: function(req,idCourse, res){//Crée absence après l'appel
      var sql = model.create(table,{"id_Course":idCourse,
                                    "id_Student": req.body.idStudent
                                    });
      /*var sql = 'INSERT INTO '+table+' ("id_Course"'+',"id_Student")'+
                                                  ' VALUES ("'+req.params.idCourse+'",'+req.body.idStudent+')';*/
    db.query(sql, function(absence,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(200).send({
          "status": 201,
          "message": "Absence créée",
          "absence": absence
        });
      }
    });
  },

  createAdvertAbsence: function(req, res){
    if(req.params.idCourse != undefined && req.body.idStudent != undefined){//Le secrétariat crée une absence justifié pour l'éléve en passant par le cours
    var sql = model.create(table,{"bool_Justify":'true',
                                      "id_Course": req.params.idCourse,
                                      "id_Student": req.body.idStudent
                                      });
      /*var sql = 'INSERT INTO '+table+' ("bool_Justify"'+',"id_Course"'+',"id_Student")'+
                ' VALUES (true,"'+req.params.idCourse+'",'+req.body.idStudent+')';*/
    }
    else if(req.params.idStudent != undefined && req.body.idCourse != undefined){//Crée une absence en passant par l'éléve
      var sql = model.create(table,{"bool_Justify":'true',
                                      "id_Course": req.body.idCourse,
                                      "id_Student": req.params.idStudent
                                      });
      /*var sql = 'INSERT INTO '+table+' ("bool_Justify"'+',"id_Course"'+',"id_Student")'+
                ' VALUES (true,"'+req.body.idCourse+'",'+req.params.idStudent+')';*/
    }
    var sql = model.create(table,newAbsence);
    db.query(sql, function(absence,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(201).send({
          "status": 201,
          "message": "Absence prévue créée",
          "absence": absence
        });
      }
    });
  },
  delete: function(req, res){
    var idAbsence = req.params.idAbsence;
    var sql = model.deleteWhere(table,pk,idAbsence);
    //var sql = 'DELETE FROM '+table+' WHERE "'+pk+'"='+id;
    db.query(sql,function(absence,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Absence supprimée",
          "absence": absence
        });
      }
    });
  },
  justify: function(req, res){
    if(req.params.idCourse != undefined && req.params.idAbsence != undefined){//Le secrétariat passe l'absence a justifiee après avoir selectionne l'absence concernée dans le cours
      var sql = model.update(table,{"bool_Justify": 'true'}, {"id_Course":req.params.idCourse,
                                                              "id_Absence":req.params.idAbsence
                                                              });
      /*var sql = 'UPDATE '+table+' SET "bool_Justify" = true'+
                ' WHERE "id_Course"='+req.params.id_Course+
                ' AND "id_Absence"='+req.params.idAbsence;*/
    }
    else if(req.params.idStudent != undefined && req.params.idAbsence != undefined){//Crée une absence en passant par l'éléve
      var sql = model.update(table,{"bool_Justify": 'true'}, {"id_Student":req.params.idStudent,
                                                            "id_Absence":req.params.idAbsence
                                                            });
      /*var sql = 'UPDATE '+table+' SET "bool_Justify" = true'+
                ' WHERE "id_Student"='+req.params.idStudent+
                ' AND "id_Absence"='+req.params.idAbsence;*/
    }
    db.query(sql,function(absence,err){
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
module.exports = absence;
