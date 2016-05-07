/*./config/database.js*/
var pg = require('pg');
var conString = "postgres://"
                +process.env.DB_USER+":"
                +process.env.DB_PASS+"@"
                +process.env.DB_HOST+'/'
                +process.env.DB_NAME;

// get a pg client from the connection pool
exports.query = function(sql){
pg.connect(conString, function(err, client, done) {
  var connectionError = function(err) {
    // no error occurred, continue with the request
    if(!err) return false;

    if(client){
      done(client);
    }
    console.log('Problème de connexion à la BD');
    return true;
  };
  var requestError = function(err) {
    if(!err) return false;
    if(client){
      done(client);
    }
    console.log('Problème avec la requête');
    return true;
  };
  
  // handle an error from the connection
  if(connectionError(err)) return;
    client.query(sql, function(err, result) {
    // handle an error from the query
    if(requestError(err)) return;
    done();
    var result = JSON.stringify(result.rows);
    console.log(result);
    return result;//Ajouter le code de retour et les informations
  });
});
};
