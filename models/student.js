var db = require('../config/database');
var student = {
  getAll: function(req, res){
    db.query('SELECT * FROM student', function(err, result) {
      res.json(result);
    });
  },
  getOne: function(req, res){
    var id = req.params.id;//On récupère l'id de l'étudiant à afficher
    db.query('SELECT * FROM student WHERE id='+id, function(err, result) {
      res.json(result);
    });
  },
  create: function(req, res){
    var newStudent = req.body;
    db.query('INSERT INTO student'
              + ' (id, name, email, password_hash)'
              + ' VALUES '
              + ' ($1, $2, $3, $4)'
           , [1, 'alice', 'alice@example.org', hash('t0ps3cret')]
           , function(err, result) {
             res.json(result);
           });
  },
  update: function(req, res){
    var id = req.params.id;
    db.query('UPDATE student'
              + 'SET name="test", email="test@hotmail.fr", password_hash="testpass"'
              + 'WHERE id='
              + id
              , function(err, result) {
                res.json(result);
    });
  },
  delete: function(req, res){
    var id = req.params.id;
    db.query('DELETE FROM student'
              + 'WHERE id='
              + id
              , function(err, result) {
                res.json(result);
    });
  }
};
module.exports = student;
