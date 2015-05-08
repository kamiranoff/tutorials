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

var express = require('express'),
  app = express();


/*==========  Environment  ==========*/
var environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  env = require('./config/env')[environment];
  console.log(env);

/*==========  middlewares  ==========*/

/*-----  End of middlewares  ------*/

/*==========  Custom middlewares  ==========*/

require('./config/customMiddlewares')(app);

/*-----  End of Custom middlewares  ------*/

/*==========  configuration  ==========*/

require('./config/config')(app, env);

/*-----  End of configuration  ------*/



/*-----  End of GLOBALS  ------*/



/*===============================
=            ROUTERS            =
===============================*/

require('./config/routers')(app);

/*-----  End of ROUTERS  ------*/



/*==============================
=            ROUTES            =
==============================*/

require('./routes/routes')(app);
require('./routes/errors')(app);
/*-----  End of ROUTES  ------*/



/*==============================
=            Listen            =
==============================*/
//Binds and listens for connections on the specified host and port

app.listen(env.port, function() {
  console.log('listening on port ' + env.port + '...');
});

/*-----  End of Listen  ------*/
