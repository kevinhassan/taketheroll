/*./routes/index.js*/
var express = require('express');
var router = express.Router();

router.get("/",function(req,res){
  res.status(200);
  res.json({"message" : "Bienvenu à l'accueil"});
});
router.get("/login/student",function(req,res){
    res.status(200);
    res.json({"role":student,"message" : "Veuillez vous connecter"});
});
router.get("/login/secretariat",function(req,res){
    res.status(200);
    res.json({"role":secretariat,"message" : "Veuillez vous connecter"});
});
router.get("/login/teacher",function(req,res){
    res.status(200);
    res.json({"role":teacher,"message" : "Veuillez vous connecter"});
});
module.exports = router;
