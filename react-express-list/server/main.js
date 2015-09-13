//Watching Building a Full-Stack App with React and Express
//21 Creating a flux store-- 00:00
var express = require('express');
var app = new express();

var parser = require('body-parser');

app.get('/',function(req,res){
  res.render('./../app/index.ejs',{});
}).use(express.static(__dirname + '/../.tmp'))
.listen(1212);


app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

console.log('./routes/items.js');
require('./routes/items.js')(app);
module.exports = app;
