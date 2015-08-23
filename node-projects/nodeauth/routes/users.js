var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    'title': 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    'title': 'Login'
  });
});


router.post('/register', function(req, res, next) {
  //get values from Form

  var name = req.body.name,
    email = req.body.email,
    username = req.body.username,
    password = req.body.password,
    password2 = req.body.password2;

  console.dir(req.headers['content-type']);

  var profileImageOriginalName = null,
    profileImageName = 'noimage.png',
    profileImageMime = null,
    profileImagePath = null,
    profileImageExt = null,
    profileImageSize = null;

  //check for Image field
  console.log(req.files, req.file);
  if (req.file || req.files) {
    if (req.file.profileimage) {
      console.log('Uploading file');

      //file Info
      profileImageOriginalName = req.files.profileimage.originalName;
      profileImageName = req.files.profileimage.name;
      profileImageMime = req.files.profileimage.mimeType;
      profileImagePath = req.files.profileimage.path;
      profileImageExt = req.files.profileimage.extension;
      profileImageSize = req.files.profileimage.size;
    }

  }

  //form validation
  //
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  //Check for errors
  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
    return;
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileImageName
    });

    //Create User
    User.createUser(newUser, function(err, user) {
      if (err) {
        throw err;
      }
      console.log(user);

    });
    req.flash('success', 'You are now registered and may log in');
    res.location('/');
    res.redirect('/');
  }


});

passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  User.getUserById(id,function(err,user){
    done(err,user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.getUserByUsername(username, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      console.log("unknown User");
      return done(null, false, {
        message: "Unknown user"
      });
    }
    User.comparePassword(password,user.password,function(err,isMatch){
      if(err){
        throw err;
      }
      if(isMatch){
        return done(null,user);
      }else{
        console.log("Invalid Password");
        return done(null,false,{message:'Invalid Password'});
      }
    });
  });
}));

router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login', failureFlash: 'Invalid username or password.' }), function(req, res, next) {
  console.log('Authentication successful');
  req.flash('success', "You are logged in");
  res.redirect('/');
});


router.get('/logout',function(req,res){
  req.logout();
  req.flash('success','You have logged out');
  res.redirect('/users/login');
});

module.exports = router;



