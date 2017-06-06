var Book = require("./models/book.js");

new Book({title: "Fake123", author: "John Fake", pubdate: 1999}).save(); 

// find all
Book.find((err,result)=>{
//console.log(result)    
});

Book.findOne({title:"dune"},(err,result)=>{
//console.log(result)    
});

Book.remove({title:"dune"},(err,result)=>{
console.log(result.result)    
});
