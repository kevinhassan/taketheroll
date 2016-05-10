var db = require('../config/database');
var table = 'user';
var pk = 'id_User';//Primary key
var model = require('./model');

var user = {
  getUser: function(username, password){
    var sql = model.selectWhere(pk+"', 'role', 'password",table,'username',username);
    console.log(sql);
    var result = db.query(sql,function(res,err){});
    if(typeof(result) != 'undefined'& result)
    {
      var json = JSON.parse(result);
      if(json.password == password)
      {
        return {'id_User':json.id_User,'role':json.role}
      }
    }
    else {
      return false;
    }
  }
};
module.exports = user;
