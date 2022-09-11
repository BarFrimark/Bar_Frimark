var http = require('http');
var fs = require('fs');
var port = 8080;
var url = require('url');
var adr ='http://localhost:8080/';
var q = url.parse(adr, true);

http.createServer(function(req,res){
    fs.readFile("SignIn.html",function(err, data){
        res.write(data);
        return res.end();    
    });
}).listen(port);
