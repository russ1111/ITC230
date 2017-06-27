var mongoose = require('mongoose');

// connection string for remote database. For security, define this in a separate file not committed to git
 var connectionString = "mongodb://russ:dbpass1@ds119682.mlab.com:19682/book_library";
 var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
 mongoose.connect(connectionString, options);

// connectionlocal db settings 
//var ip = process.env.ip || '127.0.0.1';
//mongoose.connect('mongodb://' +ip+ '/books');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 author: String,
 pubdate: String
}, {collection : "books"}); 

module.exports = mongoose.model('Book', mySchema);
