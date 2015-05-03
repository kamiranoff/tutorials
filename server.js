/**
 *
 * Server.js
 * Watching getting started with Express
 * 0204 - Router Objects
 **/

/*===============================
=            GLOBALS            =
===============================*/

/*==========  Application settings  ==========*/

var express = require('express'),
    bodyParser = require('body-parser'), //middleware - parse the body
    app = express();


/*==========  Variables  ==========*/

var names = [];

/*-----  End of Variables  ------*/


/*==========  functions  ==========*/

//next is required to go on to the next function
function log(req, res, next) {
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
app.set('jsonp callback name', 'cb');


//view options
app.enable('case sensitive routing'); // /hello /Hello
app.enable('strict routing'); // /hello == /hello/
app.enable('view cache');
app.enable('x-powered-by');


app.set('view engine', 'jade'); //set the view engine

// replace the default view folder by the folder defined as the second argument
app.set('views', 'views');




/*-----  End of CONFIGURATION  ------*/

/*==========================================================
=            Registering third-party middleware            =
==========================================================*/

//app.use registers middleware
app.use(bodyParser.urlencoded({
    extended: true
})); // using bodyParser middleware


/*-----  End of Registering third-party middleware  ------*/



/*=====================================================
=            Registering Custom middleware            =
=====================================================*/

//app.use will run on every requests
app.use(function(req, res, next) {
    console.log("this will log on every request");
    next();
});

/*-----  End of Registering Custom middleware  ------*/


/*=======================================================
=            Registering build-in middleware            =
=======================================================*/

//serve files to the server from the specified directory
//exemeple with the file.txt the public/ folder
app.use(express.static('./public'));

/*-----  End of Registering build-in middleware  ------*/




/*====================================
=            JSON EXAMPLE            =
====================================*/

//use of json replace example
app.set('json replacer', function(attr, val) {
    if (attr === 'passwordHash') {
        return undefined;
    }
    return val.toUpperCase();

});
app.get('/user_info', function(req, res) {
    //get user data
    res.json(user); // .json uses JSON.stringify
});


/*-----  End of JSON EXAMPLE  ------*/






/*==================================
=            ALL - CRUD            =
==================================*/

// run any of crud method if the route matches
app.all('/', function(req, res, next) {
    console.log('from all method');
    next();
});

/*-----  End of ALL - CRUD  ------*/


/*=================================
=            app.route            =
=================================*/

//chain methods to reduce repetition with app.route
/*
app.route('/')
  .all(function(req, res, next) {
      console.log('from all method');
      next();
  })
  .get(log, function(req, res) {
      res.render('index', { //render jade files
          names: names //Passing object of names
      });
  })
  .post(function(req, res) {
      names.push(req.body.name); //Push name into names
      res.redirect('/'); //does a get request once the post is done
  });
*/


/*-----  End of app.route  ------*/



/*==================================
=            GET - READ            =
==================================*/


//With Multiples callbacks inline
app.get('/', log, function(req, res) {
    res.render('index', { //render jade files
        names: names //Passing object of names
    });
});

app.get('/route', function(req, res) {
    res.send('this is a route');
});



//app.param has to be above the route that uses the parameters
//we passes the object as a parameter
app.param('name', function(req, res, next, name) {
    //modifies the request object
    req.name = name[0].toUpperCase() + name.substring(1); //set the first character to uppercase
    next();

    //Exemple using a name from the database
    // Users.findOne({username:name},function(err,user){
    //   req.user=user;
    //   next();
    // });
});
//route with route parameter
app.get('/name/:name', function(req, res) {
    //without the middleware defined above
    //res.send('Your name is ' + req.params.name);
    res.send('Your name is ' + req.name);

});
/*-----  End of GET - READ  ------*/



/*=====================================
=            POST - CREATE            =
=====================================*/


app.post('/', function(req, res) {
    names.push(req.body.name); //Push name into names
    res.redirect('/'); //does a get request once the post is done
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

app.listen(3000, function() {
    console.log("listening on port 3000");
});

/*-----  End of Listen  ------*/
