http = require('http');
fs = require('fs');
path = require('path');


MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain'
};

function serveFile(filePath, response) {
	fp =  __dirname + filePath;
    fs.exists(fp, function(exists) {
    if (!exists) {
	  console.log(fp+'!exists');
      //response.writeHead(404);
      response.end();
      return;
    }

    
    fs.readFile(fp, function(error, content) {
      if (error) {
		    console.log('read error');
        response.writeHead(500);
        response.end();
        return;
      }
      //console.log('read '+ filePath);
      var extension = path.extname(filePath);
      var mimeType = MIME_TYPES[extension];
      response.writeHead(200,
                         {'Content-Type': mimeType ? mimeType : 'text/html'});
      response.end(content, 'uft-8');
    });
  });
}

exports.serveFile = serveFile;
