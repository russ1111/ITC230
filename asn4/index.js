'use strict'

var       http = require('http'),        
            fs = require('fs'),
            qs = require('querystring'),
         books = require('./lib/books');

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars = require("express-handlebars");
app.engine('.handlebars', handlebars({extname: '.handlebars'}));
app.set("view engine", ".handlebars");


// send content of 'home' view
app.get('/', function(req,res){
    res.render('home', {siteName: "The Movie Database"});
});

app.get('/about', function(req,res){
    res.render('about');
});

app.get('/img/logo.jpg', function(req,res){
    res.render('logo.jpg');
});

app.post('/search', function(req,res){
    let result = books.get(req.body.title);
    
    if(!(books.get(req.body.title))){
        res.send('Searching for: ' + req.body.title + '<br>' + 
                 'No records found for: '  + req.body.title);
    } else {
        res.render('details', {title: req.body.title, result: result });
    } 
});

app.post('/remove', function(req,res){
   if(!(books.get(req.body.title))){
        res.send("No records found for: " + req.body.title);
    } else {
//        res.send(JSON.stringify(books.remove(req.body.title)));
        res.send(books.remove(req.body.title));
    }    
});

app.post('/add', function(req,res){
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        pubdate: req.body.pubdate
    };
    
    if(books.get(req.body.title)){
        res.send("Title is already in the collection: " + req.body.title);
    } else {
//        res.send(books.add(req.body.title, req.body.author, req.body.pubdate));
        res.send(books.add(newBook));
    }    
});

app.get('/headers', function(req,res){
   res.set('Content-Type','text/plain');    
   var s = '';    
   for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';    
   res.send(s);  
});




app.use(function(req,res){
    res.status(404).render('404');
});


app.listen(app.get('port'), function() {
 console.log('Express started'); 
});

