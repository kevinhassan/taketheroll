/*./config/database.js*/
var query = function(sql, callback)
{
  var pg = require('pg');
  var connectionString = process.env.DB_URL;
  pg.defaults.ssl = true;
  pg.connect(connectionString, function(error, client, done) {
    // Problème de la connexion à la BD
    if(error) {
      console.error('Connection failed to postgres database',error);
      var error = new Error("Connection failed to postgres database");
      error.http_code = 500;
      return callback(null,error);
    }
    client.query(sql,function(error, result){
      //On ferme la connexion
      client.end();
      if(error){
        console.error('Query return an error',error);
        var error = new Error("Query return an error");
        error.http_code = 400;
        return callback(null,error);
      }
      // No error
      callback(result.rows,null);
      return;
    });
  });
};

exports.query = query;
