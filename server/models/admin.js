var db = require('../config/database');
var table = 'administrator';
var pk = 'id_Administrator';//Primary key
var model = require('./model');

var admin = {
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    var sql = model.selectWhere('*',table,pk,id);
    var result = db.query(sql,function(res,err){
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
    });
    res.send(result);
  }
};

module.export = admin;
