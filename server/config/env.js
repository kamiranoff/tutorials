var path = require('path');
var rootPath = path.normalize(__dirname + '/../../' );

module.exports = {
  development:{
    db: 'mongodb://localhost/meanstack',
    rootPath:rootPath,
    port:process.env.PORT || 3030,
    msgEnv:'development'
  },
  production:{
    db:'kamiranoff:Jenifer75@ds027479.mongolab.com:27479/meanstack',
    rootPath:rootPath,
    port: process.env.PORT || 80,
    msgEnv:'production'
  }
};

