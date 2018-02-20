// var express = require('express');
// var app = express();
// var db= require('./db');
// var UserController = require('./UserController');
// app.use('/users', UserController);



// module.exports = app
var http = require('http');
// var os = require('os');
// var ifaces = os.networkInterfaces();
// console.log(ifaces);
// console.log(port);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);
