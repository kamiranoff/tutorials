/**
 *
 * Server.js
 * Watching: TutsPlus Getting Started with Express
 * watching Node.js Real Time Chat: Inserting Data (Part 4/7) on Youtube
 **/

/*===============================
=            GLOBALS            =
===============================*/
/*==========  Application settings  ==========*/
// ./ points to the root folder

var express = require('express'),
  app = express();


var mongo = require('mongodb').MongoClient,
    io = require('socket.io')(8080).sockets;



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
=            Socket            =
==============================*/

//require('./config/mongo.js');

mongo.connect('mongodb://127.0.0.1/chat', function(err, db) {
  if (err) {
    throw err;
  }
  console.log('connected to db');
  io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('input',function(data){
      console.log(data);
    })
  });
});


/*-----  End of Socket  ------*/




/*==============================
=            Listen            =
==============================*/
//Binds and listens for connections on the specified host and port

app.listen(env.port, function() {
  console.log('listening on port ' + env.port + '...');
});

/*-----  End of Listen  ------*/
