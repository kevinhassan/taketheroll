var db = require('../config/database');
var table = 'administrator';
var catchError = require('../config/catchError');
var pk = 'id_Administrator';//Primary key
var model = require('./model');

var admin = {
  getOne: function(req,res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,{pk:id});
    db.query(sql,function(admin,err){
      if(err){
        console.error(err);
        return fn(null,err);
      }
      else{
        return fn(admin,null);
      }
    });
  },
  create: function(req, res){//Crée un administrateur
    if(req.body.nom != undefined && req.body.prenom != undefined){
      var sql = model.create(table,{"name":req.body.nom,
                                    "nickname":req.body.nickname
                                    });
      /*var sql = 'INSERT INTO '+table+' ("name"'+',"nickname")'+
                ' VALUES ("'+req.body.nom+'",'+req.body.nom+')';*/
    }
    db.query(sql, function(admin,err){
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
    });//Ajouter à utilisateur
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
    });//Supprimer de utilisateur
  },
}

module.export = admin;
