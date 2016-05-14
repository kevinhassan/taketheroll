var db = require('../config/database');
var table = 'administrator';
var catchError = require('../config/catchError');
var pk = 'id_Administrator';//Primary key
var model = require('./model');

var admin = {
  getOne: function(req,res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,{"id_Administrator":id});
    db.query(sql,function(admin,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(200).send({
          "status": 201,
          "message": "administrateur crée",
          "admin": admin
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
  delete: function(req, res){
    var id = req.params.id;
    var sql = model.deleteWhere(table,pk,id);
    //var sql = 'DELETE FROM '+table+' WHERE "'+pk+'"='+id;
    db.query(sql,function(admin,err){
      if(err){
        catchError(res,err);
      }
      else{
        res.status(200).send({
          "status": 201,
          "message": "Administrateur supprimée"
        });
      }
    });
  },
}

module.export = admin;
