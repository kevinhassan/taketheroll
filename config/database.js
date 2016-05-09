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
      console.log(err);
      // Callback the error instead
      return res.status(500).json({ success: false, data: err});
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
        console.log(results);
        return results;
    });
  });
};

exports.query = query;

// Then ( var db = require('path/to/this');   db.query(query, function(){ ... });
