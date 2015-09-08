//Watching Building a Full-Stack App with React and Express
//12 bundling the application with browserify -- 00:00
var express = require('express');

var app = new express();


app.get('/',function(req,res){
  res.render('./../app/index.ejs',{

  });
}).use(express.static(__dirname + '/../app'))
.listen(7777);
