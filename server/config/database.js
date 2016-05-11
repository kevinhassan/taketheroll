/*./config/database.js*/
var query = function(sql, callback)
{
  var pg = require('pg');
  var connectionString = process.env.DB_URL;
  pg.defaults.ssl = true;
  pg.connect(connectionString, function(error, client, done) {
    // Problème de connexion à la BD
    if(error) {
      console.error('Connexion à la base de donnée impossible',error);
      var error = new Error("Connexion à la base de donnée impossible");
      error.http_code = 500;
      return callback(null,error);
    }
    client.query(sql,function(error, result){
      //On ferme la connexion
      client.end();
      if(error){
        console.error('La requête a retournée une erreur',error);
        var error = new Error("La requête a retournée une erreur");
        error.http_code = 400;
        return callback(null,error);
      }
      // Pas d'erreur
      callback(result.rows,null);
      return;
    });
  });
};

exports.query = query;
