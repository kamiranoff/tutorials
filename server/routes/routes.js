/*==============================
=            ROUTES            =
==============================*/

module.exports = function(app) {


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

  /*==========  Formatting Requests  ==========*/

  app.get('/format', function(req, res) {
    names = ['Wolverine', 'Psylocke','Jean Grey'];
    res.format({
      'text/plain': function() {
        res.send('text response');
      },
      'text/html': function() {
        res.render('index.jade', {
          names: names
        });
      },
      'application/json': function() {
        res.json({
          topic: 'Express'
        });
      }
    });
  });

  /*-----  End of RESPONSE OBJECT  ------*/

  /*==================================
  =            ALL - CRUD            =
  ==================================*/

  // run any of crud method if the route matchesa
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

};
/*-----  End of ROUTES  ------*/
