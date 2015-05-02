var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.set('env', 'development'); // process.env.NODE_ENV = 'production'
app.enable('trust proxy');
app.set('jsonp callback name','cb');
app.set('json replacer',function(){


});

app.get('/user_info', function(req,res){
  res.json(user); // JSON.stringify
});

app.enable();
app.disable();


//next is required to go on to the next function
function log(req,res,next){
  console.log('simple logging');
  next();
}


var names = [];

//views option
app.enable('view cache');
app.set('view engine', 'jade');


// run any of crud method if the route matches
// multiple callback refactored. Log is called first
app.all('/',log,function(req,res,next){
  console.log('from all method');
  next();
});

//GET   - READ


//With Multiples callbacks inline
app.get('/',function(req,res,next){
  console.log(names);
  next();
},function(req,res){
    res.render('index',{
     names:names
    });
});

//POST - CREATE
app.post('/', function(req,res){
  names.push(req.body.name);
  res.redirect('/'); //DOES A GET REQUEST
});


//app.put
//app.delete



app.listen(3000, function(){
  console.log("listening on port 3000");
});