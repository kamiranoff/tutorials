/**
*
* Node Js. tuto
* Finished project One. Simple webserver
*
**/


// Required modules
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

// Mime Types
var mimeTypes = {
  "html":"text/html",
  "jpeg":"image/jpeg",
  "jpg":"image/jpeg",
  "png":"image/png",
  "js":"text/javascript",
  "css":"text/css"
};


//Create Server
http.createServer(function(req,res){
  //gets the path
  var uri = url.parse(req.url).pathname;
  //gets the current path of the process
  var fileName = path.join(process.cwd(),unescape(uri));
  console.log('Loading' + uri);


  // check if file exists
  var stats;
  try{
    stats = fs.lstatSync(fileName);
  }catch(e){
    res.writeHead(404,{'Content-type':'text/plain'});
    res.write('404 Not Found');
    res.end();
    return;
  }

  // Check if file/directory
  if(stats.isFile()){
    //get the mimeTypes on spliting on the dot of the mimeTypes Object;
    var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
    res.writeHead(200,{'Content-type':mimeType});

    var fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);
  }else if(stats.isDirectory()){
    res.writeHead(302,{
      'Location':'index.html'
    });
  }else{
    res.writeHead(500,{'Content-type':'text/plain'});
    res.write('500 Internal Error');
    res.end();
  }
}).listen(3000);





