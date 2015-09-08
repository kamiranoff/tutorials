var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var expressValidator = require('express-validator');
var categories = db.get('categories');



router.get('/show/:id', function(req, res, next) {
  var db = req.db;
  var posts = db.get('posts');
  posts.findById(req.params.id, function(err, post) {
    res.render('show', {
      "post": post
    });
  });
});


router.get('/add', function(req, res, next) {

  console.log(categories);
  categories.find({}, {}, function(err, categories) {
    res.render('addpost', {
      "title": "Add Post",
      "categories": categories
    });
  });
});


router.post('/add', function(req, res, next) {
  //Get the form values
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();
  console.dir(req.headers['content-type']);


  var mainImageName = "noimage.png";
  console.log(req.file, req.file);
  if (req.file) {

    var mainImageOriginalName = req.file.originalname;
    var mainImageMime = req.file.mimetype;
    var mainImagePath = req.file.path;
    var mainImageExt = req.file.extension;
    var mainImageSize = req.file.size;
    mainImageName = req.file.filename;
  }

  //For validation
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('body', 'Body field is required').notEmpty();

  //Check errors
  var errors = req.validationErrors();

  if (errors) {
    categories.find({}, {}, function(err, categories) {
      res.render('addpost', {
        'errors': errors,
        'title': title || '',
        'body': body ||  '',
        'categories': categories
      });
    });
  } else {
    var post = db.get('posts');

    //Submit to db
    post.insert({
      "title": title,
      "body": body,
      "category": category,
      "date": new Date(),
      "author": author,
      "mainimage": mainImageName
    }, function(err, post) {
      if (err) {
        res.send("There was an issue submitting the post");
      } else {
        req.flash('success', "Post submitted");
        res.location('/');
        res.redirect('/');
      }

    });
  }
});


router.post('/addcomment', function(req, res, next) {
  //Get the form values
  var name = req.body.name;
  var email = req.body.email;
  var body = req.body.body;
  var postid = req.body.postid;
  var date = new Date();
  var posts = db.get('posts');

  //For validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.assert('email', 'Email is not formatted properly').isEmail();
  req.checkBody('body', 'Body field is required').notEmpty();

  //Check errors
  var errors = req.validationErrors();

  if (errors) {

    posts.findById(postid, function(err, post) {
      res.render('show', {
        'errors': errors,
        'post': post || ''
      });
    });

  } else {
    var comment = {
      "name": name,
      "email": email,
      "body": body,
      "commentdate": date
    };

    //Submit to db
    posts.update({
        "_id": postid,
      }, {
        $push: {
          "comments": comment
        }
      },
      function(err, doc) {
        if (err) {
          throw err;
        } else {
          req.flash('success', 'Comment Added');
          res.location('/posts/show/' + postid);
          res.redirect('/posts/show/' + postid);
        }
      });
  }
});



module.exports = router;
