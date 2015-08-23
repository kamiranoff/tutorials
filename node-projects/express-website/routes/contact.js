var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', {
    title: 'Contact'
  });
});

router.post('/send', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'kamiranoff@gmail.com',
      pass: 'Jenifer75@'
    }
  });

  var mailOptions = {
    from: 'Jhon Doe <jhondoe@outlook.com',
    to: 'kamiranoff@gmail.com',
    subject: 'Website Submission',
    text: 'You have a new submission from ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
    html: '<p> You have a new submission from<ul><li>' + req.body.name + '</li><li>' + req.body.email + '</li><li>' + req.body.message + '</li></ul></p>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('message Sent' + info.response);
      res.redirect('/');
    }
  });

});

module.exports = router;
