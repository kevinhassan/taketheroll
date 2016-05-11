var db = require('../config/database');
var table = 'administrator';
var catchError = require('../config/catchError');
var pk = 'id_Administrator';//Primary key
var model = require('./model');

var admin = {
  getOne: function(req, fn){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,pk,id);
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
}

module.export = admin;
