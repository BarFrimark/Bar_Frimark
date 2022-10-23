const express = require('express');
const path = require('path');
const CRUD = require('./CRUD');

const app = express();
const port = 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

// open SignIn page
app.get('/', function(req,res){
    res.render("SignIn")
});

// open SignUp page
app.get('/SignUp', function(req,res){
    res.render('SignUp') 
});

// open HomePage
app.get('/HomePage', CRUD.HomePageUpload);

// update shifts table
app.get('/shiftButton', CRUD.startEndShift);

// open UserDetails page
app.get('/UserDetails', CRUD.updateUserUpload);

// check LogIn and open home page
app.post('/checkLogIn', CRUD.checkLogIn);

// create a new user and open home page
app.post("/newUser", CRUD.createNewUser);

// update user and open home page
app.post("/updateUser", CRUD.updateUser);

app.listen(port, function(){
    console.log("server is on port: " + port)
});
