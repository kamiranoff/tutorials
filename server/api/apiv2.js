/*==============================================
=            express.router() APIv2            =
==============================================*/

//Router object all to use all these method in contain environment
// - use
// - param
// - verb / all
// - route

var APIv2 = require('express').Router();

APIv2.get('/', function(req,res) {
  res.send('first from API 2');
});

APIv2.get('/name', function(req,res) {
  res.send('first name from API 2');
});

module.exports = APIv2;

/*-----  End of express.router() APIv2  ------*/