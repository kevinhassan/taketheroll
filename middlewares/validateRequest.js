var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
var db = require('../models/model');
module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
      try {
        // Decoding the passed token
        var decoded = jwt.decode(token, require('../config/secret.js')());

        // Check wether date is valid or not
        if (decoded.exp <= Date.now()) {
            // Send back the result
            res.status(400);
            res.json({
                "status": 400,
                "message": "Token expired"
            });
            return;
        }
        // Authorize the user to see if s/he can access our resources
        db.query(decoded.username, function(err,dbUser){
        if (err){
            return(err,null);
        }
        if (dbUser) {
          //On définit les routes autorisé en fonction des rôles
          if ( (req.url.indexOf('admin') > 0 && (decoded.role == 'admin' && dbUser.role == 'admin')) || (req.url.indexOf('admin') < 0 && (req.url.indexOf('/api/admin') >= 0) )) {
                  next(); // To move to next middleware
          }
          if ( (req.url.indexOf('student') > 0 && (decoded.role == 'student' && dbUser.role == 'student')) || (req.url.indexOf('student') < 0 && (req.url.indexOf('/api/student') >= 0) )) {
                  next(); // To move to next middleware
          }
          if ( (req.url.indexOf('teacher') > 0 && (decoded.role == 'teacher' && dbUser.role == 'teacher')) || (req.url.indexOf('teacher') < 0 && (req.url.indexOf('/api/teacher') >= 0) )) {
                  next(); // To move to next middleware
          }
          else {
              res.status(403);
              res.json({
                  "status": 403,
                  "message": "Not Authorized"
              });
              return;
          }
          //next();
        }
        else {
            // No user with this name exists, send back a 401
            res.status(401);
            res.json({
                "status": 401,
                "message": "User unknown"
            });
            return;
        }
      });
    }
    catch (err) {
        res.status(500);
        res.json({
            "status": 500,
            "message": "Unknown error",
            "error": err
        });
    }
  }
  else {
    res.status(401);
    res.json({
        "status": 401,
        "message": "Missing token"
    });
    return;
  }
};
