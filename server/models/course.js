var db = require('../config/database');
var table = 'course';
var pk = 'id_Course';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');
var moment = require('moment');//Gérer les heures de manière intelligente
var teacher = require('./teacher');

var course = {
  getOne: function(req, fn){
    //Professeur:
    //On récupère l'id en fonction de l'heure de cours et de la date d'aujourd'hui
    //Le formatage de l'heure se fait avec momentjs
    var sql = model.selectAll('id_Course',table);
    db.query(sql+ ' WHERE date='+moment().format('L')
    +' AND '+ moment().format('LT') + ' BETWEEN '+ 'start_Time AND end_Time',function(result,err){
      if(err){
        console.error(err);
        return fn(null,err);
      }
      else{
        return fn(result,null);
      }
    });
  },
  getAll: function(req, fn){
    //Admin:
    //Lister tous les cours
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
  taketheroll:function(req,fn){
    var updateData = {'bool_Roll':true};//A recupèrer dans le formulaire
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
module.exports = course;
