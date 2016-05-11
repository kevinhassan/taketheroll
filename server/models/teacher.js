var db = require('../config/database');
var table = 'teacher';
var pk = 'id_Teacher';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');
var absence = require('./absence');
var course = require('./course');

var teacher = {
  takeTheRoll:function(req,res){
    //Met bool_roll à vrai
    //On recoit les éléves absents en json
    //On crée une absence pour chacun en renvoyant leur id
    if(!isEmptyObject(req.body.student)){//Si y'a des absents
      for(var student in req.body.student){
        absence.create(student);
      }
    }
    course.taketheroll();//Passer le booléen à vrai
  }
};

module.exports = teacher;
