
var express = require("express");
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://127.0.0.1:27017/Arun',function(err, database){
    db = database;
    console.log("connection set");
});

var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});
router.post("/",function(req, res) {
     console.log("got signup");
var query = { fn: req.body.fn ,ln: req.body.ln };
db.collection('Arun').find(query).toArray((err,result)=>{
            if(err)
                alert("error");
            console.log(result);
            // res.send(result);
            if(result.length == 0 ){
                db.collection('Arun').save(req.body,(err,result)=>{
    if(err) return err;
    // console.log();
    console.log("saved to DB");
        db.collection('Arun').find().toArray((err,result)=>{
            if(err)
                alert("error");
            res.send(result);
        })

        })
}
else{
    res.send("User Name Already Exists ");
}

        
})




});
router.post("/data",function(req, res) {
 db.collection('Arun').save(req.body,(err,result)=>{
    if(err) return err;
    console.log("saved to DB");
        })

});
router.post("/auth",function(req, res) {
console.log("auth")
 var query = { fn: req.body.fn , ln: req.body.ln };
db.collection('Arun').find(query).toArray((err,result)=>{
            if(err)
                alert("error");
            console.log(result);
            res.send(result);
        })

});
app.use('/',router)