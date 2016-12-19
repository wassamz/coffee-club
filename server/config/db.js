var Mongoose = require('mongoose'); 
var config = require('./config');

//Mongoose.Promise = require('bluebird');
Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
var db = Mongoose.connection;
//var uri = 'mongodb://' + config.database.host + '/' + config.database.db;
//var db = mongoose.createConnection(uri);

db.on('error', console.error.bind(console, 'connection error'));  
db.once('open', function callback() {  
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;  
exports.db = db;  
