var http = require('http'),        
      fs = require('fs'),
      qs = require('querystring'),
   books = require('./lib/books');

'use strict'
const express = require("express");
const app = express();


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files


let handlebars =  require("express-handlebars").create({ defaultLayout: "main" });
app.engine("html", handlebars.engine);
app.set("view engine", "handlebars");


// send static file as response
//app.get('/', function(req,res){
// res.type('text/html');
// res.sendFile(__dirname + '/public/home.html'); 
//});

// send content of 'home' view
app.get('/', function(req,res){
 res.render('home');
});


// send plain text response
app.get('/about', function(req,res){
 res.type('text/plain');
 res.send('About page');
});

// define 404 handler
app.use(function(req,res) {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
 console.log('Express started'); 
});


//function serveStaticFile(res, path, contentType, responseCode) {        
//    if(!responseCode) responseCode = 200;        
//    fs.readFile(__dirname + path, function(err,data) {                
//        if(err) {                        
//            res.writeHead(500, { 'Content-Type': 'text/plain' });                       res.end('500 - Internal Error');                
//        } else {                        
//            res.writeHead(responseCode, { 'Content-Type': contentType });                 res.end(data);                
//        }        
//    }); 
//}
//
//http.createServer(function(req,res){  
//    var url = req.url.split("?"); 
//    var params = qs.parse(url[1]); 
//    var path = url[0].toLowerCase(); 
//    
//    switch(path) {                
//        case '/':                        
//            serveStaticFile(res, '/public/home.html', 'text/html');                       break;                
//        case '/about':                        
//            serveStaticFile(res, '/public/about.html', 'text/html');                     break;         
//        case '/add':
//            res.writeHead(200, { 'Content-Type': 'text/plain' });                       res.end('Add');   
//            break;
//        case '/search':
//            if(!(books.get(params.title))){
//                res.writeHead(200, { 'Content-Type': 'text/plain' });
//                res.end('No records found for: ' + params.title);
//            } else {
//                res.writeHead(200, { 'Content-Type': 'text/plain' });
//                res.end(JSON.stringify(books.get(params.title)));
//            } 
//            break;
//        case '/remove':
//            if(!(books.get(params.title))){
//                res.writeHead(200, { 'Content-Type': 'text/plain' });
//                res.end("No records found for: " + params.title);
//            } else {
//                res.writeHead(200, { 'Content-Type': 'text/plain' });
//                res.end(JSON.stringify(books.remove(params.title)));
//            }   
//        case '/img/logo.jpg': 
//            serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');                   break;                
//        default: 
//            serveStaticFile(res, '/public/notfound.html', 'text/html', 404);             break;        
//    } 
//}).listen(3000);

//console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
