var db = require('../config/database');
var table = 'users';
var pk = 'id_User';//Primary key
var model = require('./model');

var user = {
  getUser: function(user,fn){
    var sql = model.selectWhere(pk+'", "role", "password',table,"username",user.username);
    db.query(sql,function(res,err){
      if(res[0] !== undefined)
      {
        if(res[0].password == user.password)
        {
          var result = {'id_User':res[0].id_User,'role':res[0].role};
          console.log(result);
          return fn(result,null);
        }
      }
      else{
        console.error(err);
        return fn(null,err);//Utilisateur absent
      }
    });
  },
  createUser: function(user,fn){
    var sql = model.create(table,user);
    db.query(sql,function(res,err){
      if (err){
        console.error(err);
        return fn(null,err);
      }
      console.log(res);
      return fn(res,null);
    });
  }
};
module.exports = user;
