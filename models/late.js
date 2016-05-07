var db = require('../config/database');
var late = {
  getAll: function(req, res){
    /*Je regarde dans l'objet utilisateur mon role
    Si je suis étudiant -> je n'affiche que les retards de mon id
    Sinon j'affiche tous*/
      result = db.query('SELECT * FROM late');
      res.json(result);
  },
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    db.query('SELECT * FROM late WHERE id='+id);
    res.json(result);
  },
  justify: function(req, res){
    var id = req.params.id;
  }
};
module.exports = late;
