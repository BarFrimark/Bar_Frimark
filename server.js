var http = require('http');
var fs = require('fs');
var port = 3030;
var url = require('url');
var adr ='http://localhost:3030/';

http.createServer(function(req,res){
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename,function(err, data){
        if(err){
            res.writeHead("Bad idea");
            return res.end("404 not found");
        }
        res.write(data);
        return res.end();    
    });
}).listen(port);
