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

let result = Book.find(function (err, items) {
  if (err) return next(err);
  console.log(items.length);
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
    
    new Book(newBook).save();
    
    res.render('added', {title: req.body.title})
});

app.get('/headers', function(req,res){
   res.set('Content-Type','text/plain');    
   var s = '';    
   for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';    
   res.send(s);  
});


//API Routes
app.get('/api/v1/books', (req, res) => {
	Book.find((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/v1/books/:title', (req, res, next) => {
    let title = req.params.title;
//    console.log(title);
    Book.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json(result);    
    });
});

app.get('/api/v1/remove/:title', (req, res, next) => {
    let title = req.params.title;
    Book.remove({title: title}, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({deleted: result.result.n});
    });
});

app.get('/api/v1/add/:title/:author/:pubdate', (req, res, next) => {
    // find & update existing item, or add new 
    let title = req.params.title;
    Book.update({title: title}, {title:title, author: req.params.author, pubdate: req.params.pubdate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({added: result.n});
    });
});



app.use(function(req,res){
    res.status(404).render('404');
});


app.listen(app.get('port'), function() {
 console.log('Express started'); 
});

