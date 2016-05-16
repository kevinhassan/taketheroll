var tokenInspector = require('../config/tokenInspector');

module.exports = function(req, res, next) {

  var token = tokenInspector.getToken(req);
  if (token) {
        // Check wether date is valid or not
        if (tokenInspector.getExp(token) <= Date.now()) {
            // Send back the result
            res.status(400);
            res.json({
                "status": 400,
                "message": "Token expiré"
            });
            return;
        }
        var role = tokenInspector.getRole(token);
        //On définit les routes autorisé en fonction des rôles
        if (req.url.indexOf('api/admin') >0 && role == 'administrator') {
                next(); // To move to next middleware
        }
        else if (req.url.indexOf('api/student') > 0 && role == 'student') {
                next();
        }
        else if (req.url.indexOf('api/teacher') > 0 && role == 'teacher') {
                next();
        }
        else {
            res.status(403);
            res.json({
                "status": 403,
                "message": "Pas Autorisé"
            });
            return;
        }
      }
  else {
    res.status(401);
    res.json({
        "status": 401,
        "message": "Token Manquant"
    });
    return;
  }
};
