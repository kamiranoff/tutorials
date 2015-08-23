var express = require('express');
var router = express.Router();


function ensureAuthentication(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

/* GET home page. */
router.get('/', ensureAuthentication, function(req, res, next) {
  res.render('index', { title: 'Members' });
});




module.exports = router;
