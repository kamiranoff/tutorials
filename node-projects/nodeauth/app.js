var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');//validate and sanitize
var cookieParser = require('cookie-parser');


var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var bodyParser = require('body-parser');
var multer = require('multer');//file upload helper
var flash = require('connect-flash');//stores messages in session


var expressMessages = require('express-messages');//provides flash notification rendering

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;




var PORT = process.env.PORT || 3000; //specify a port

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use('/bower_components',  express.static(path.join(__dirname,'/bower_components')));



//middlewares
//Multer : Handle File Uploads
app.use(multer({ dest: './uploads/'}).single('profileimage'));




// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//handle Express sessions
app.use(session({
  secret : 'secret',
  saveUninitialized:true,
  resave:true
}));



//Passport
app.use(passport.initialize());
app.use(passport.session()); //has to be after express session middleware.

//Validator
app.use(expressValidator({
  errorFormatter: function(param,msg,value){

    var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
    while(namespace.length){
      formParam += '[' + namespace.shift() +']';
    }
    return{
      param : formParam,
      msg : msg,
      value : value
    };

  }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(flash());
app.use(function(req,res,next){
  res.locals.messages = expressMessages(req,res);

  next();
});

//routes
var routes = require('./routes/index');
var users = require('./routes/users');

app.get('*',function(req,res,next){
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



app.listen(PORT);
console.log('server started on port %s', PORT);

module.exports = app;
