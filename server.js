/**
*
* Server.js
* Watching getting started with Express
* 0106 - Application settings
**/

/*===============================
=            GLOBALS            =
===============================*/

/*==========  Application settings  ==========*/

var express = require('express'),
    bodyParser = require('body-parser'),  //middleware - parse the body
    app = express();


/*==========  Variables  ==========*/

var names = [];

/*-----  End of Variables  ------*/


/*==========  functions  ==========*/

//next is required to go on to the next function
function log(req,res,next){
  console.log(names);
  next();
}

/*-----  End of functions  ------*/


/*-----  End of GLOBALS  ------*/

/*=====================================
=            CONFIGURATION            =
=====================================*/
/**

* app.set();        //app.set(name, value)
* app.get();        //Returns the value of name app setting, where name is one of strings in the app settings table
* app.set('title', 'My Site');
* app.get('title'); // "My Site"
*
* app.enable();     //Sets the Boolean setting name to true
* app.disable();    //Sets the Boolean setting name to false,
* app.enabled();    //Returns true if the setting name is enabled (true)
* app.disabled();   //Returns true if the Boolean setting name is disabled (false),
**/

app.set('env', 'development'); // process.env.NODE_ENV = 'production'
app.enable('trust proxy');

//change the callback name while sending jsonp
app.set('jsonp callback name','cb');



// using bodyParser middleware
app.use(bodyParser.urlencoded({extended:true}));

/*-----  End of CONFIGURATION  ------*/









app.set('json replacer',function(attr,val){
  if(attr === 'passwordHash'){
    return undefined;
  }
  return val.toUpperCase();

});

app.get('/user_info', function(req,res){
  //get user data
  res.json(user); // JSON.stringify
});





//views option
app.enable('view cache');
app.set('view engine', 'jade');

/*==================================
=            ALL - CRUD            =
==================================*/

// run any of crud method if the route matches
app.all('/',function(req,res,next){
  console.log('from all method');
  next();
});

/*-----  End of ALL - CRUD  ------*/


/*==================================
=            GET - READ            =
==================================*/


//With Multiples callbacks inline
app.get('/',log,function(req,res){
    res.render('index',{  //render jade files
     names:names          //Passing object of names
    });
});

/*-----  End of GET - READ  ------*/



/*=====================================
=            POST - CREATE            =
=====================================*/


app.post('/', function(req,res){
  names.push(req.body.name);    //Push name into names
  res.redirect('/');            //does a get request once the post is done
});

/*-----  End of POST - CREATE  ------*/


/*====================================
=            PUT - UPDATE            =
====================================*/



/*-----  End of PUT - UPDATE  ------*/



/*=======================================
=            DELETE - DELETE            =
=======================================*/



/*-----  End of DELETE - DELETE  ------*/





/*==============================
=            Listen            =
==============================*/
//Binds and listens for connections on the specified host and port

app.listen(3000, function(){
  console.log("listening on port 3000");
});

/*-----  End of Listen  ------*/


