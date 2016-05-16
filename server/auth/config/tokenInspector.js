var jwt = require('jwt-simple');

var tokenInspector = {

  getUserId: function(token){
    return jwt.decode(token, require('./secret')()).user.id_User;
  },

  getExp: function(token){
    return jwt.decode(token, require('./secret')()).exp;
  },

  getRole: function(token){
    return jwt.decode(token, require('./secret')()).user.role;
  },

  getToken: function(req){
    return (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  }
};

module.exports = tokenInspector;
