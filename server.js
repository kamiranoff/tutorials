/**
 *
 * Server.js
 * Watching: TutsPlus Getting Started with Express
 * finished tuto
 **/

/*===============================
=            GLOBALS            =
===============================*/

/*==========  Application settings  ==========*/
// ./ points to the root folder
//
var express = require('express'),
    bodyParser = require('body-parser'), //middleware - parse the body
    app = express(),
    APIv1 = require('./server/api/apiv1.js'), //require router 1
    APIv2 = require('./server/api/apiv2.js'); //require router 2


/*==========  Variables  ==========*/

var names = [];
var user = {
    'name': 'kevin',
    'role': 'admin'
};
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

// //use of json replace example
// app.set('json replacer', function(attr, val) {
//     if (attr === 'passwordHash') {
//         return undefined;
//     }

//     return val.toUpperCase();

// });
app.get('/user_info', function(req, res) {
    //get user data

    res.json(user); // .json uses JSON.stringify
});


/*-----  End of JSON EXAMPLE  ------*/



/*=====================================
=            ROUTER OBJECT            =
=====================================*/
//Router object all to use all these method in contain environment
// - use
// - param
// - verb / all
// - route

var router = express.Router({
    caseSensitive: false, //default option
    strict: true //default option
});

router.use(function(req, res, next) {
    console.log('router specific middleware. Will log in all routers');
    next();
});

router.get('/', function(req, res) {
    res.send('router home route');
});

//Set the specific route for the router
app.use('/api', router);

//Register custom routers from folder ./api/;
app.use('/api/v1', APIv1);
app.use('/api/v2', APIv2);

/*-----  End of ROUTER OBJECT  ------*/


/*=======================================
=            REQUEST OBJECTS            =
=======================================*/
/**
 * url: '/:ATTR?ATTR=Kevin '   //exemple url
 * req.params.ATTR;            //get token with : in the url
 * req.query.ATTR;             //get query string in the url
 * req.body.ATTR               //require a body parser middleware
 * req.param('ATTR')           // check all the above in this order : params,body,query
 *
 * req.route;                  //
 * req.originalUrl             //
 * req.cookies.ATTR            //
 * req.get();                  //any header name
 * req.accepts('');            //return a boolean ex: application/JSON;
 *
 **/

app.get('/animals/:animal', function(req, res) {
    console.log(req.params.animal); //get token with : in the url
    console.log(req.query.name); //get the query string in the url ex ?name=kevin
    res.send(req.params.animal);
});


/*-----  End of REQUEST OBJECTS  ------*/






/*=======================================
=            RESPONSE OBJECT            =
=======================================*/

app.get('/response-object', function(req, res, next) {
    res.status(200);
    res.set(header, value);
    res.get(header);
    res.status(404).json({
        error: 'message'
    });
    res.redirect(301, '/');

    // res.cookie(name, value);
    // res.clearCookie(name)

    // res.send(status, text);
    // res.json(status, object);
    // res.jsonp(status, object). //callback({});
    // res.download(file);

    // res.render(file,props,function(err,html){
    //   res.send(200,html);
    // });



    next();
});

/*==========  Formatting Requests  ==========*/

app.get('/format',function(req,res){
  names = ['Wolverine','Psylocke'];
  res.format({
    'text/plain':function(){
      res.send('text response');
    },
    'text/html':function(){
      res.render('index.jade',{names:names});
    },
    'application/json':function(){
      res.json({topic:'Express'});
    }
  });
});

/*-----  End of RESPONSE OBJECT  ------*/




/*==================================
=            ALL - CRUD            =
==================================*/

// run any of crud method if the route matches
app.all('/', function(req, res, next) {
    console.log('from all method');
    next();
});

/*-----  End of ALL - CRUD  ------*/

/*==================================
=            GET - READ            =
==================================*/

/*==========  simple route  ==========*/

app.get('/route', function(req, res) {
    res.send('this is a route');
});

/*==========  route with multiples callbacks inline  ==========*/

app.get('/', log, function(req, res) {
    res.render('index', { //render jade files
        names: names //Passing object of names
    });
});


/*==========  route with parameters  ==========*/
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



/*==============================
=            Listen            =
==============================*/
//Binds and listens for connections on the specified host and port

app.listen(3000, function() {
    console.log("listening on port 3000");
});

/*-----  End of Listen  ------*/
