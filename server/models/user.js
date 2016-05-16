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
    var user = user.body;//Contient plus de donnée que la table users
    user.password = crypt.encrypt(user.password);//Username correspond au password
    var sql = model.create(table,{"username":user["username"],"password":user["password"],"role":user["role"]});
    db.query(sql,function(res,err){
      if(err){
        catchError(res,err);
      }
      else{
        sql = model.selectWhere('"id_User"','users',{"username":user.username});//On remonte l'id de l'user créé
        db.query(sql,function(idUser,err){
          if(err){
            catchError(res,err);
          }
          else{
            user["id_User"] = idUser[0]["id_User"];//On ajoute l'id au JSON
            delete user.username;
            delete user.password;
            if(user.role == 'student'){
              delete user.role;
              student.create(user,res);
            }
            else if(user.role == 'teacher'){//A moins de colonne que student
              user = {"name":user["name"],"nickname":user["nickname"],"email":user["email"],"id_User":user["id_User"]}
              teacher.create(user,res);
            }
            else if(user.role == 'administrator'){
              user = {"name":user["name"],"nickname":user["nickname"],"email":user["email"],"id_User":user["id_User"]};
              admin.create(user,res);
            }
          }
        });
      }
    });
    res.status(201).send({
      'status':201,
      'message':'Utilisateur créé'
    });
  }
};
module.exports = user;
