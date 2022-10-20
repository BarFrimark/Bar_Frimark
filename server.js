const express = require('express');
const path = require('path');
const CRUD = require('./CRUD');
//const bodyParser = require ('body-parser');

const app = express();
const port = 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
    res.render("SignIn")
});
app.get('/SignUp', function(req,res){
    res.render('SignUp') 
});
app.get('/HomePage', CRUD.updateShiftTable);

app.post('/checkLogIn', CRUD.checkLogIn);

// create a new User and open home page
app.post("/newUser", CRUD.createNewUser);

app.listen(port, function(){
    console.log("server is on port" + port)
});
