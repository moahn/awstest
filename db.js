//var MongoClient = require('mongodb').MongoClient;
////Create a database named "mydb":
//var url = "mongodb://localhost:27017/mydb";
//
//MongoClient.connect(url, function(err, db) {
//  if (err) throw err;
//  console.log("Database created!");
//  db.close();
//});
//old
//var mongo = require('mongodb');
//var url = "mongodb://localhost:27017/mydb";
//mongo.connect(url, function(err, db) {
//  if (err) throw err;
//  console.log("Database created!");
//  db.close();
//});

//new
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/users');
