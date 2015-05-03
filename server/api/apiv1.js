/*==============================================
=            express.router() APIv1            =
==============================================*/

//Router object all to use all these method in contain environment
// - use
// - param
// - verb / all
// - route

var APIv1 = require('express').Router();

APIv1.get('/', function(req,res) {
  res.send('first from API 1');
});

APIv1.get('/name', function(req,res) {
  res.send('first name from API 1');
});

module.exports = APIv1;

/*-----  End of express.router() APIv1  ------*/



