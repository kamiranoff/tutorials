/**
 *
 * Server.js
 * Finished : Chat tuto
 *
 **/

/*===============================
=            GLOBALS            =
===============================*/
/*==========  Application settings  ==========*/
// ./ points to the root folder

var express = require('express'),
  app = express();

/*============================
=            LOGS            =
============================*/
var log4js = require('log4js');
var logger = log4js.getLogger();

logger.trace('logger.trace');
logger.debug('logger.debug.');
logger.info('logger.info');
logger.warn('logger.warn');
logger.error('logger.error');
logger.fatal('logger.fatal');


/*-----  End of LOGS  ------*/

/*==========  Environment  ==========*/
var environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  env = require('./config/env')[environment];
logger.info('Environment:', env);

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

/*============================
=            CHAT            =
============================*/

require('./chat/chatController.js')(env, logger);


/*-----  End of CHAT  ------*/


/*==============================
=            Listen            =
==============================*/
//Binds and listens for connections on the specified host and port

app.listen(env.port, function() {
  logger.info('listening on port ' + env.port + '...');
});

/*-----  End of Listen  ------*/
