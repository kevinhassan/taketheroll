#Projet Web

This is a web application project has for aim "Taking the roll" in an IG class.
The system could accounting lates and absents students.

##Sum up :
###3 actors :

* Teacher : make the roll and put student absent or late.
* Student : see absences and lates and justify them.
* Administration : can see all absences for a course or for a student. They add the possibility to switch absences to justify absences

##Technologies :

###Front-end:
* AngularJS 1.5
* Materialize

###Back-end:
* NodeJS 4.2.6
* PostgreSQL 9.5.2

####Set up :
* To launch nodeJs :
```
$ cd server/
```
$ node server.js
``` 

It will be available on http://localhost:3000/

* To launch client go into "ngClient" directory and follow this instructions :

```
$ npm install gulp gulp-connect
```
$ gulp
```

It will be launch to http://localhost:2772/

* You need to configure Database access for that add your database link 

```
$ cd .
```
$ "DB_URL=postgres://username:password@databasePath/dbname">> .env
```

##### Made by **Kévin Hassan** IG3-Polytech Montpellier
