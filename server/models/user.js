var db = require('../config/database');
var table = 'users';
var pk = 'id_User';//Primary key
var model = require('./model');
var crypt = require('../auth/config/crypt')

var user = {
  getUser: function(user,fn){
    var sql = model.selectWhere(pk+'", "role", "password',table,"username",user.username);
    db.query(sql,function(res,err){
      if(res[0] !== undefined)
      {
        if(crypt.decrypt(res[0].password) == user.password)
        {
          var result = {'id_User':res[0].id_User,'role':res[0].role};
          return fn(result,null);
        }
        else{//Le mot de passe ne correspond pas

        }
      }
      else{
        console.error(err);
        return fn(null,err);//Utilisateur absent
      }
    });
  },
  createUser: function(user,fn){
    user.password = crypt.encrypt(user.password);
    console.log(user);
    var sql = model.create(table,user);
    db.query(sql,function(res,err){
      if (err){
        console.error(err);
        return fn(null,err);
      }
      return fn(res,null);
    });
  }
};
module.exports = user;
