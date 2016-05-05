/*Connect to DB postgres*/
var db = JSON.parse(process.env.DB_URL);//on parse l'url
db = 'postgres://'+db.DB_USER+':'+db.DB_PASS+'@'+db.DB_HOST+'/'+db.DB_NAME;
var client = new pg.Client(db);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  else{
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].theTime);
      client.end();
    });
  }
});
