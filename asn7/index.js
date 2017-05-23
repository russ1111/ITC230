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
app.engine('.handlebars', handlebars({extname: '.handlebars', defaultLayout: 'main'}));
app.set("view engine", ".handlebars");

//app.use('/api', require('cors')());

var Book = require("./models/Book.js");

//new Book({title: "Fake123", author: "John Fake", pubdate: 1999}).save(); 

// return all records
let result = Book.find(function (err, items) {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});


// send content of 'home' view
app.get('/', function(req,res){
//    res.render('home', {siteName: "The Book Database", titles: ["dune", "it", "moby dick", "othello", "hamlet"]});
    Book.find( function (err, items) {
      if (err) return next(err);
          let test = items.title;
          console.log(test);
          res.render('home', {siteName: "The Book Database", titles: items});
          // other code here
      });
//    res.render('home', {siteName: "The Book Database", titles: result.title});
});

app.get('/all', function(req,res){
    console.log(books.all());
});

app.get('/about', function(req,res){
    res.render('about', {siteName: "The Book Database"});
});

app.get('/img/logo.jpg', function(req,res){
    res.render('logo.jpg');
});

app.post('/search', function(req,res,next){
      let result = req.body.title;    
    
      Book.findOne({"title": result}, (err, books) => {
          if(err){
              return next(err);
          } 
          if(!books){
              res.render('notFound', {title: req.body.title});
          } else {
              res.render('details', {title: books.title, result: books});
          }
      }); 
});

app.post('/remove', function(req,res){
//    var result = books.remove(req.body.title);
    var result = Book.remove({title:req.body.title}, (err, result) => {
        if(result.result.n == 0){
            res.render('notFound', {title: req.body.title});
        } else {
            res.render('deleted', {title: req.body.title});
        }    
    });
   
});

app.post('/add', function(req,res){
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        pubdate: req.body.pubdate
    };
    var result = books.add(newBook);
//    var result = Book.add(newBook);

    if(!result.added){
        res.send("Title is already in the collection: " + req.body.title);
    } else {
        res.send("Title added");
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

