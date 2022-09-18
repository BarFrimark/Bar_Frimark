const express = require('express');
const app = express();
const port = 8200;
const mysql = require('mysql2');
const dbConfig = require('./dbConfig');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
})

connection.connect(Error)


express.static('.', [])

var one = function (req, res, next) {
    console.log("Here are req.params" + req.params);
    next();
};

var two = function (req, res) {
    res.send("res.send");
};

app.get('/', one, two)

var three = function () {
    console.log('app listening http://localhost:' + port);
}

app.listen(port, three);

