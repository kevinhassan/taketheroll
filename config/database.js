/*./config/database.js*/
var query = function(sql, callback)
{
  var pg = require('pg');
  var connectionString = "postgres://"
                  +process.env.DB_USER+":"
                  +process.env.DB_PASS+"@"
                  +process.env.DB_HOST+'/'
                  +process.env.DB_NAME;
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      // Callback the error instead
      callback(null,{'status':500,'success': false,'data': err});
      return;
    }
    var query = client.query(sql);
    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
        done();
        // Callback function call instead
        callback(results,null);
        return;
    });
  });
};

exports.query = query;

// Then ( var db = require('path/to/this');   db.query(query, function(){ ... });
