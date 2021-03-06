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

app.use('/api', require('cors')());

var Book = require("./models/Book.js");

//new Book({title: "Fake123", author: "John Fake", pubdate: 1999}).save(); 

// return all records
let result = Book.find(function (err, items) {
  if (err) return next(err);
  console.log(items.length);
  // other code here
});


// send content of 'home' view
app.get('/', (req,res) => {
//    res.render('home', {siteName: "The Book Database", titles: ["dune", "it", "moby dick", "othello", "hamlet"]});
    Book.find((err, items) => {
      if (err) return next(err);
          res.render('home', {siteName: "The Book Database", titles: items});
      });
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
//    var result = books.add(newBook);
//    var result = Book.add(newBook);
    
    
//    var result = new Book(newBook).save();

//    if(!result.added){
//        res.send("Title is already in the collection: " + req.body.title);
//    } else {
//        res.send("Title added");
//    }    
//    var result = Book.add({newBook}, (err, result) => {
//        if(result.result.n == 0){
//            res.render('notFound', {title: req.body.title});
//        } else {
//            res.render('deleted', {title: req.body.title});
//        }    
//    });
    
//    new Book({title: req.body.title, author: req.body.author, pubdate: req.body.pubdate}).save((err) =>{
//        if (err) {
//            console.log(err);
//            res.send("error");
//        }
//        else {
//            console.log("Saved");
//            res.send("added");
//        }
        
//    if(Book.findOne({title: req.body.title})){
//        res.send("already have title");
//    } else {
    
    new Book (newBook).save();
    
//        new Book({title: req.body.title, author: req.body.author, pubdate: req.body.pubdate}).save();
    res.render('added', {title: req.body.title})
//    };
});

app.get('/headers', function(req,res){
   res.set('Content-Type','text/plain');    
   var s = '';    
   for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';    
   res.send(s);  
});

//api
//app.get('/api/v1/book/:title', (req, res, next) => {
//    let title = req.params.title;
//    console.log(title);
//    Book.findOne({title: title}, (err, result) => {
//        if (err || !result) return next(err);
//        res.json( result );    
//    });
//});

app.get('/api/books', (req, res) => {
	Book.find((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.use(function(req,res){
    res.status(404).render('404');
});


app.listen(app.get('port'), function() {
 console.log('Express started'); 
});

