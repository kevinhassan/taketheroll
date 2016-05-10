var db = require('../config/database');
var table = 'late';
var pk = 'id_Late';//Primary key
var model = require('./model');

var late = {
  getAll: function(req, res){//Student : récupérer son id,Admin: afficher toute retard d'un éléve, ou d'un cours
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
  getOne: function(req, res){//Récupérer l'id de l'user(student) + celui du retard
    var idCourse = req.params.idCourse;
    var idLate = req.params.idLate;
    var sql = model.selectWhere('*',table,pk,{'id_Course':idCourse,'id_Late':idLate});
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
    var idLate = req.params.idLate;
    var newLate = {'id_Late':idLate,'bool_Justify':false};
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
    var idLate = req.params.idLate;
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
module.exports = late;
