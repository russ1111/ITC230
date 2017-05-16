var mongoose = require('mongoose');

// connection string for remote database. For security, define this in a separate file not committed to git
// var connectionString = "mongodb://<USER>:<PASSWORD>@ds015962.mlab.com:15962/<DB_NAME>";
// var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
// mongoose.connect(connectionString, options);

// connectionlocal db settings 
var ip = process.env.ip || '127.0.0.1';
mongoose.connect('mongodb://' +ip+ '/books');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Bookj model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
 _id: String,
 title: { type: String, required: true },
 author: String,
 pubdate: Number
}, {collection : "books"}); 

module.exports = mongoose.model('Book', mySchema);