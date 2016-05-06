/*./routes/index.js*/
var express = require('express');
var router = express.Router();
var auth = require('./auth');
var student = require('../models/student');
var admin = require('../models/admin');
var teacher = require('../models/teacher');
var absence = require('../models/absence');
var late = require('../models/late');

//Tout le monde peut accèder à cette adresse
router.get("/",function(req,res){
  res.status(200);
  res.json({"message" : "Bienvenu à l'accueil"});
});
// On choisira dans un dropdown qui ont est : etudiant, professeur, secretariat
router.get("/login",function(req,res){
    res.status(200);
    res.json({"message" : "Veuillez vous connecter"});
});
//On vérifie les données saisies et on redirige en /student/ ou /teacher/ ou /admin/
router.post("/login",auth.login);

//Seul les étudiants peuvent y accéder
router.get('/api/student/absence', absence.getAll);
router.get('/api/student/absence/:id', absence.getOne);
router.post('/api/student/absence/:id', absence.justify);//Justifier absence
router.post('/api/student/absence', absence.notify)//avertir d'une absence
router.get('/api/student/late', late.getAll);
router.get('/api/student/late/:id', late.getOne);
router.put('/api/student/late/:id', late.update);//Justifier retard

//Seul les professeurs peuvent y accéder
router.get('/api/teacher/students',student.getAll);
router.post('/api/teacher/course/:id/students',teacher.takeTheRoll);//Faire l'appel sur la liste des étudiants
router.put('/api/teacher/course/:id/students', teacher.switchToLate);//Passer d'une absence a un retard
//Seul le secrétariat peut y accéder
/**
* Gérer les étudiants
*/
router.get('/api/admin/students', student.getAll);
router.get('/api/admin/student/:id', student.getOne);
router.post('/api/admin/student/', student.create);
router.put('/api/admin/student/:id', student.update);
router.delete('/api/admin/student/:id', student.delete);
//Consuler les alertes récentes
router.get('/api/admin/alert',admin.showAlert);
//Gérer les absences
router.get('/api/admin/students/absences',absence.getAll);
router.get('/api/admin/students/absences/:id',absence.justify);
router.get('/api/admin/students/absences',absence.delete);
router.get('/api/admin/students/absences',absence.add);//Ajouter une absence justifier par l'éléve
//Gérer les retards
router.get('/api/admin/students/lates',late.getAll);
router.get('/api/admin/students/lates/:id',late.justify);
router.get('/api/admin/students/lates',late.delete);

module.exports = router;
