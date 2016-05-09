/*./routes/index.js*/
var express = require('express');
var router = express.Router();
var auth = require('./auth');
var student = require('../models/student');
var admin = require('../models/admin');
var teacher = require('../models/teacher');
var absence = require('../models/absence');
var late = require('../models/late');
var course = require('../models/course');

router.get("/",student.getAll);
router.get("/:id",student.getOne);
router.delete("/:id",student.delete);
router.post("/",student.create);
router.put("/:id",student.update);
/*
router.get("/",function(req,res){
  res.status(200);
  res.json({"message" : "Bienvenu à l'accueil"});
});
router.get("/login",function(req,res){
  res.status(200);
  res.json({"message" : "Etes vous étudiant professeur ou administrateur"});
});
// On choisira à l'accueil si on est : etudiant, professeur, secretariat
router.get("/login/:role",function(req,res){
    res.status(200);
    res.json({"message" : "Veuillez vous connecter"});
});
//On vérifie les données saisies et on redirige en /student/ ou /teacher/ ou /admin/
router.post("/login",auth.login);

//---------------------Seul les étudiants peuvent y accéder--------------------------------//
router.get('/api/student/absence', absence.getAll);
router.get('/api/student/absence/:id', absence.getOne);
//Justifier absence
router.post('/api/student/absence/:id', function(req,res)
{
    res.status(200);
    res.json({"message": "Justificatif transmis pour l'absence"});
});
//avertir d'une absence
router.post('/api/student/absence', function(req,res){
  res.status(200);
  res.json({"message": "Justificatif transmis"});
});
router.get('/api/student/late', late.getAll);
router.get('/api/student/late/:id', late.getOne);
//Justifier retard
router.post('/api/student/late/:id', function(req,res){
  res.status(200);
  res.json({"message": "Justificatif transmis pour le retard"});
});
//-----------------------------------------------------------------------------//

//-----------Seul les professeurs pourront y accèder---------------------------//
router.get('/api/teacher/course',course.getOne);
router.get('/api/teacher/course/:id/students',student.getAll);//On récupère la liste pour faire l'appel
router.post('/api/teacher/course/:id/students',teacher.takeTheRoll);//Faire l'appel sur la liste des étudiants
/*Passer les absences en retard se fera avec un Trigger, ceux qui était déclaré absent et sont écrit en retard
seront effacé de la table absent puis mit dans la table retard*/
//-----------------------------------------------------------------------------//

//-----------Seul le secrétariat peut y accéder--------------------------------//
/**
* Gérer les étudiants par la liste
*/
/*router.get('/api/admin/students', student.getAll);
router.get('/api/admin/students/:id', student.getOne);
router.post('/api/admin/students/', student.create);
router.put('/api/admin/students/:id', student.update);
router.delete('/api/admin/students/:id', student.delete);
//Consuler les alertes récentes
router.get('/api/admin/alerts',admin.showAlert);//Liste toute les absences et retards
//Gérer les absences en fonction du cours
router.get('/api/admin/courses/:id/absences',absence.getAll);
router.get('/api/admin/courses/:idCourse/absences/:idAbsence',absence.getOne);
router.put('/api/admin/courses/:idCourse/absences/:idAbsence',absence.justify);//Si justification suffisante passe à justifié
router.post('/api/admin/courses/:idCourses/absence',absence.create);//Ajouter une absence justifier avant le cours par l'éléve
//Gérer les retards en fonction du cours
router.get('/api/admin/courses/:id/late',late.getAll);
router.get('/api/admin/courses/:idCourse/late/:idLate',late.getOne);
router.put('/api/admin/courses/:idCourse/late/:idLate',late.justify);//Passe a justifié si étudiant a une justification
//Gérer les absences en fonction de l'étudiant
router.get('/api/admin/students/:id/absences',absence.getAll);
router.get('/api/admin/students/:idStudent/absences/:idAbsence',absence.getOne);
router.put('/api/admin/students/:idStudent/absences/:idAbsence',absence.justify);//Si justification suffisante l'absence est justifiée
router.post('/api/admin/students/:id/absences',absence.add);//Ajouter une absence justifier avant le cours par l'éléve
//Gérer les retards en fonction de l'étudiant
router.get('/api/admin/students/:id/lates',late.getAll);
router.get('/api/admin/students/:idStudent/lates/:idLate',late.getOne);
router.put('/api/admin/students/:idStudent/absences/:idLate',late.justify);*
//-----------------------------------------------------------------------------//
*/
module.exports = router;
