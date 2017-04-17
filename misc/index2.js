var http = require('http'),        
      fs = require('fs'),
      qs = require('querystring');

function serveStaticFile(res, path, contentType, responseCode) {        
    if(!responseCode) responseCode = 200;        
    fs.readFile(__dirname + path, function(err,data) {                
        if(err) {                        
            res.writeHead(500, { 'Content-Type': 'text/plain' });                       res.end('500 - Internal Error');                
        } else {                        
            res.writeHead(responseCode, { 'Content-Type': contentType });                 res.end(data);                
        }        
    }); 
}

http.createServer(function(req,res){    
    var url = req.url.split("?");
    console.log(qs.parse(req.url));
    
    // normalize url by removing querystring, optional        
    // trailing slash, and making lowercase        
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();        
    switch(path) {                
        case '':                        
            serveStaticFile(res, '/public/home.html', 'text/html');                       break;                
        case '/about':                        
            serveStaticFile(res, '/public/about.html', 'text/html');                     break;    
        case '/search':                        
            serveStaticFile(res, '/public/search.html', 'text/html');                     break;       
        case '/add':                        
            serveStaticFile(res, '/public/add.html', 'text/html');                     break;       
        case '/delete':                        
            serveStaticFile(res, '/public/delete.html', 'text/html');                     break;       
        case '/img/logo.jpg': 
            serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');                   break;                
        default: 
            serveStaticFile(res, '/public/notfound.html', 'text/html', 404);                   break;        
    } 
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
