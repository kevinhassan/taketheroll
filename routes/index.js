/*./routes/index.js*/
var express = require('express');
var router = express.Router();
var auth = require('./auth');
var student = require('./student');
var admin = require('./admin');
var absence = require('./absence');
var late = require('./late');

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
router.get('/student/absence', absence.getAll);
router.get('/student/absence/:id', absence.getOne);
router.post('/student/absence/:id', absence.justify);//Justifier absence
router.post('/student/absence', absence.notify)//avertir d'une absence
router.get('/student/late', late.getAll);
router.get('/student/late/:id', late.getOne);
router.put('/student/late/:id', late.update);//Justifier retard

//Seul les professeurs peuvent y accéder
router.get('/teacher/students',student.getAll);
router.post('teacher/students/roll',teacher.takeTheRoll);//Faire l'appel sur la liste des étudiants
router.put('teacher/students/roll/:id', student.switchToLate);//Passer d'une absence a un retard
//Seul le secrétariat peut y accéder
/**
* Gérer les étudiants
*/
router.get('/admin/students', student.getAll);
router.get('/admin/student/:id', student.getOne);
router.post('/admin/student/', student.create);
router.put('/admin/student/:id', student.update);
router.delete('/admin/student/:id', student.delete);
//Consuler les alertes récentes
router.get('/admin/alert',admin.alert);
//Gérer les absences
router.get('/admin/students/absences',absence.getAll);
router.get('/admin/students/absences/:id',absence.justify);
router.get('/admin/students/absences',absence.delete);
router.get('/admin/students/absences',absence.add);//Ajouter une absence justifier par l'éléve
//Gérer les retards
router.get('/admin/students/lates',late.getAll);
router.get('/admin/students/lates/:id',late.justify);
router.get('/admin/students/lates',absence.delete);

module.exports = router;
