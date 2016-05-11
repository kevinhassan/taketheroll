var db = require('../config/database');
var table = 'course';
var pk = 'id_Course';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');
var moment = require('moment');//Gérer les heures de manière intelligente
var teacher = require('./teacher');

var course = {
  getOne: function(req, res){
    //Professeur:
    //On récupère l'id en fonction de l'heure de cours et de la date d'aujourd'hui
    //Le formatage de l'heure se fait avec momentjs
    var sql = model.selectAll('id_Course',table);
    db.query(sql+ ' WHERE date='+moment().format('L')
    +' AND '+ moment().format('LT') + ' BETWEEN '+ 'start_Time AND end_Time',function(course,err){
      if(err){
        catchError(res,err);
      }
      else if(course.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Il n'y a pas de cours maintenant",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Cours trouvés",
          "course": course
        });
      }
    });
  },
  getAll: function(req, res){
    //Admin:
    //Lister tous les cours
    var sql = model.selectAll('*',table);
    db.query(sql, function(courses,err){
      if(err){
        catchError(res,err);
      }
      else if(courses.length == 0){
        res.status(200).send({
          "status": 200,
          "message": "Il n'y a pas de cours",
        });
      }
      else{
        res.status(200).send({
          "status": 200,
          "message": "Cours trouvés",
          "courses": courses
        });
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
