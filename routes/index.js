/*./routes/index.js*/
var express = require('express');
var router = express.Router();
var auth = require('./auth')
//Tout le monde peut accèder à ces adresses
router.get("/",function(req,res){
  res.status(200);
  res.json({"message" : "Bienvenu à l'accueil"});
});
// On choisira dans un dropdown qui ont est : etudiant, professeur, secretariat
router.get("/login",function(req,res){
    res.status(200);
    res.json({"message" : "Veuillez vous connecter"});
});
router.post("/login",auth.login);//On vérifie les données saisies

//Seul les étudiants peuvent y accéder

//Seul les professeurs peuvent y accéder

//Seul le secrétariat peut y accéder
module.exports = router;
