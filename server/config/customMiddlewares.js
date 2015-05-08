/*=====================================================
=            Registering Custom middleware            =
=====================================================*/

module.exports = function(app) {

  //app.use will run on every requests
  app.use(function(req, res, next) {
    //console.log('this will log on every request');
    next();
  });

};
/*-----  End of Registering Custom middleware  ------*/
