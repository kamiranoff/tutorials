//Finished tuto nodeblog
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');
var multer = require('multer');


var expressMessages = require('express-messages');
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

var flash = require('connect-flash');

var truncate = require('html-truncate');


var PORT = process.env.PORT || 3000; //specify a port

var app = express();



//app.locals --> makes a global variable
app.locals.moment = require('moment');

app.locals.truncateText = function(text, length){
  var truncatedText = truncate(text, length);

  return truncatedText;
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//MIDDLEWARES
app.use(multer({
  dest: './public/images/uploads'
}).single('mainimage'));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());



//handle Express sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


app.use(express.static(path.join(__dirname, 'public')));

//connect flash - messages
app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = expressMessages(req, res);
  next();
});

//Make our db accessible to our route
app.use(function(req,res,next){
  req.db = db;
  next();
});

var routes = require('./routes/index');
var posts = require('./routes/posts');
var categories = require('./routes/categories');

app.use('/', routes);
app.use('/posts', posts);
app.use('/categories', categories);

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
