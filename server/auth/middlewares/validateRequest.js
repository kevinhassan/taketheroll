var jwt = require('jwt-simple');
module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
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
        var role = decoded.user.role;
        // Authorize the user to see if s/he can access our resources
        //On définit les routes autorisé en fonction des rôles
        if (req.url.indexOf('api/admin') >0 && role == 'administrator') {
                next(); // To move to next middleware
        }
        else if (req.url.indexOf('api/student') > 0 && role == 'student') {
                next(); // To move to next middleware
        }
        else if (req.url.indexOf('api/teacher') > 0 && role == 'teacher') {
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
    res.status(401);
    res.json({
        "status": 401,
        "message": "Missing token"
    });
    return;
  }
};
