// import + declare
const express = require('express');
const path = require('path');
const CreateDB = require('./DB/CreateDB');
const CRUD = require('./DB/CRUD');
const port = 8080;

// setups
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

// DB functions
app.get('/createDB',CreateDB.createTables);
app.get('/insertData', CreateDB.insertData);
app.get('/showUsers', CreateDB.showUsers);
app.get('/showShifts', CreateDB.showShifts);
app.get('/dropTables', CreateDB.dropTables);

// routs
app.get('/', function(req,res){ res.render("SignIn") });
app.get('/SignUp', function(req,res){ res.render('SignUp') });
app.get('/HomePage', CRUD.HomePageUpload);
app.get('/shiftButton', CRUD.startEndShift);
app.get('/UserDetails', CRUD.updateUserUpload);
app.get("/deleteUser", CRUD.deleteUser);
app.post('/checkLogIn', CRUD.checkLogIn);
app.post("/newUser", CRUD.createNewUser);
app.post("/updateUser", CRUD.updateUser);

// listen
app.listen(port, function(){
    console.log("server is on port: " + port)
});
