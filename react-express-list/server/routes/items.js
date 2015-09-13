module.exports = function(app) {

  var items = [{
    name: "React and Express",
    purchased: "true"
  }, {
    name: "Learn Node js - 10 projects"
  }, {
    name: "Learn Angularjs - 10 projects"
  }, {
    name: "Learn Backbonejs - 10 projects"
  }];


  app.route('/api/items')
  .get(function(req, res,next) {
    res.send(items);
  })
  .post(function(req,res){
    var item = req.body;
    items.push(item);
  });
  console.log('./routes/items.js');
};
