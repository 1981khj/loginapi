//require('nodetime').profile({stdout: true});
//require('nodetime').profile();
var port = process.env.PORT;
var express = require('express');
var app = express.createServer();
var fs = require('fs');
var mongo = require("mongoskin");
var mongoUrl = "mongodb://admin:admin@ds031637.mongolab.com:31637/servicelog?auto_reconnect";

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set("view options", {layout: false});
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  //스타일 정의
  //app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  //app.use(require('stylus').middleware({ src: __dirname + '/public', compress: true }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

//기본적인 에러 핸들러 설정(development)
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

//기본적인 에러 핸들러 설정(production)
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/', function(req, res) {
     fs.readFile(__dirname + '/views/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.post('/login', function(req, res) {
    var oMongoDb = mongo.db(mongoUrl);
    var oUserInfoCollection = oMongoDb.collection("userinfo");
    
    var sUserName = req.body.user_id;
    var sUserPassword = req.body.user_password;    
    
    oUserInfoCollection.find({user_id: sUserName, user_password: sUserPassword}).toArray(function(err, items) {
        if (err) throw err;
        
        if(items.length){
            console.log(items);    
            res.send({'status':'success', 'userId':items[0].user_id, 'groups': items[0].groups});
        }else{
            res.send({'status':'fail'});
        }        
    });
});

if (!module.parent) {
  app.listen(port);
  console.log('Server is Running! listening on port '+port);
}