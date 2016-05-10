var db = require('../config/database');
var table = 'course';
var pk = 'id_Course';//Primary key
var model = require('./model');
var moment = require('moment');//Gérer les heures de manière intelligente
var teacher = require('./teacher');

var course = {
  getOne: function(req, res){
    //Professeur:
    //On récupère l'id en fonction de l'heure de cours et de la date d'aujourd'hui
    //Le formatage de l'heure se fait avec momentjs
    var sql = model.selectAll('id_Course',table);
    var result = db.query(sql+ ' WHERE date='+moment().format('L')
    +' AND '+ moment().format('LT') + ' BETWEEN '+ 'start_Time AND end_Time');

  },
  getAll: function(req, res){
    //Admin:
    //Lister tous les cours
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
  taketheroll:function(req,res){
    var updateData = {'bool_Roll':true};//A recupèrer dans le formulaire
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
module.exports = course;
