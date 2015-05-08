/*=====================================
=            ROUTER OBJECT            =
=====================================*/
//Router object all to use all these method in contain environment
// - use
// - param
// - verb / all
// - route
var express = require('express'),
    APIv1 = require('../api/apiv1.js'), //require router 1
    APIv2 = require('../api/apiv2.js'); //require router 2

module.exports = function(app) {


var router = express.Router({
    caseSensitive: false, //default option
    strict: true //default option
});

router.use(function(req, res, next) {
    console.log('router specific middleware. Will log in all routers');
    next();
});

router.get('/', function(req, res) {
    res.send('router home route');
});

//Set the specific route for the router
app.use('/api', router);

//Register custom routers from folder ./api/;
app.use('/api/v1', APIv1);
app.use('/api/v2', APIv2);

};
/*-----  End of ROUTER OBJECT  ------*/