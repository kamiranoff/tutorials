var path = require('path');
var rootPath = path.normalize(__dirname + '/../../' );

module.exports = {
  development:{
    db: '',
    rootPath:rootPath,
    port:process.env.PORT || 3030,
    msgEnv:'development'
  },
  production:{
    db:'',
    rootPath:rootPath,
    port: process.env.PORT || 80,
    msgEnv:'production'
  }
};

