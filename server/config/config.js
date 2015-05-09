/*=====================================
=            CONFIGURATION            =
=====================================*/

var express = require('express'),
  favicon = require('serve-favicon'),
  path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  errorHandler = require('errorhandler');




module.exports = function(app, configEnv) {
  var env = app.settings.env;
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

  app.enable('trust proxy');

  //change the callback name while sending jsonp
  app.set('jsonp callback name', 'cb');

  //view options
  app.enable('case sensitive routing'); // /hello /Hello
  app.enable('strict routing'); // /hello !== /hello/
  app.enable('view cache');
  app.enable('x-powered-by');

  //view engine
  app.set('view engine', 'jade'); //set the view engine

  // replace the default view folder by the folder defined as the second argument
  app.set('views', configEnv.rootPath + '/server/views');

  //bodyParser Middleware
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());


  app.use(morgan('combined'));
  /*=======================================================
  =            Registering build-in middleware            =
  =======================================================*/

  //exemeple with the file.txt from the public/ folder
  //serve files to the server from the specified directory
  //
  //optional first parameters.
  app.use('/assets', express.static(path.join(configEnv.rootPath, 'client')));
  /*-----  End of Registering build-in middleware  ------*/

  // our custom "verbose errors" setting
  // which we can use in the templates
  // via settings['verbose errors']
  app.disable('verbose errors');

  // disable them in production
  // use $ NODE_ENV=production node examples/error-pages
  if ('development' == env) {
    app.enable('verbose errors');
  }

  if ('production' === env) {
    app.use(favicon(path.join(configEnv.rootPath, 'public', 'favicon.ico')));
    app.use(express.static(path.join(configEnv.rootPath, 'public')));
    app.set('appPath', configEnv.rootPath + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(configEnv.rootPath, '.tmp')));
    app.use(express.static(path.join(configEnv.rootPath, 'client')));
    console.log('config.js - Root: ' + configEnv.rootPath);
    app.use('/bower_components', express.static(path.join(configEnv.rootPath, '/bower_components')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler({
      dumpExceptions: true,
      showStack: true
    })); // Error handler - has to be last
  }





};
/*-----  End of CONFIGURATION  ------*/
