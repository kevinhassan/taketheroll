var jwt = require('jwt-simple');
var auth = {

  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Aucune information saisie"
      });
      return;
    }
    //Sinon on teste l'username et le password
    var dbUserObj = auth.validate(username, password);

    if (!dbUserObj) { // Si l'authentication a échoué on renvoie un 401
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    if (dbUserObj) {
      // Si l'authentication a fonctionné on génére un token pour le client
      res.json(genToken(dbUserObj));
      res.status(201);
      res.json({
        "status": 201,
        "message": "Utilisateur authentifié"
      });

    }
  },
  validate: function(username, password) {
  //On requête la base de donnée et on renvoie l'objet utilisateur
    var dbUserObj = {
      name: 'hassan',
      role: 'etudiant',
      username: 'kevin.hassan@gmail.com'
    };
    return dbUserObj;
  },
  validateUser: function(username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB.
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };

    return dbUserObj;
  },
}

//Methode pour le token
function genToken(user) {
  var expires = expiresIn(7); // 7 jours
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
