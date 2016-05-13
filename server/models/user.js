var db = require('../config/database');
var table = 'users';
var pk = 'id_User';//Primary key
var catchError = require('../config/catchError');
var model = require('./model');
var crypt = require('../auth/config/crypt')

var student = require('./student');
var teacher = require('./teacher');
var admin = require('./admin');

var user = {
  getUser: function(user,fn){
    var sql = model.selectWhere('"'+pk+'", "role", "password"', table,{"username":user.username});
    //var sql = 'SELECT "'+pk+'", "role", "password" FROM '+table+' WHERE "username"='+"'"+user.username+"'";
    db.query(sql,function(res,err){
      if(res[0] !== undefined)
      {
        if(crypt.decrypt(res[0].password) == user.password)
        {
          var result = {'id_User':res[0].id_User,'role':res[0].role};
          return fn(result,null);
        }
        else{//Le mot de passe ne correspond pas
          console.error("Le mot de passe n'est pas bon");
          return fn(null,err);
        }
      }
      else{
        console.error("L'utilisateur est inconnu");
        return fn(null,err);//Utilisateur absent
      }
    });
  },
  create: function(user,res){
    var user = user.body;
    user.password = crypt.encrypt(user.password);//Username correspond au password
    var sql = model.create(table,user);
    db.query(sql,function(result){
      if(err){
        catchError(res,err);
      }
      else{
        sql = model.selectWhere('id_User','users',{"username":user.username});//On remonte l'id de l'user créé
        db.query(sql,function(idUser){
          if(err){
            catchError(res,err);
          }
          else{
            delete user.username;
            delete user.password;
            if(user.role == 'student'){
              delete user.role;
              student.create(table,user);
            }
            else if(user.role == 'teachers'){
              delete user.role;
              teacher.create(table,user);
            }
            else if(user.role == 'administrator'){
              delete user.role;
              admin.create(table,user);
            }
          }
        });
        res.status(201).send({
          'status':201,
          'message':'Utilisateur créé'
        });
      }
    });
  }
};
module.exports = user;
