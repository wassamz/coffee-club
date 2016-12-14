
var Hapi = require('hapi'),
    Routes = require('./routes'),
    Db = require('./config/db'),
    Moment = require('moment'),
    Config = require('./config/config');

var Inert = require('inert');
var Path = require('path');

var app = {};
app.config = Config;

var privateKey = app.config.key.privateKey;
var ttl = app.config.key.tokenExpiry;

//var server = Hapi.createServer(app.config.server.host, app.config.server.port, { cors: true });

var server = new Hapi.Server();
//server.connection({ port: app.config.server.port });

// Validate function to be injected 
var validate = function (token, callback) {
    // Check token timestamp
    var diff = Moment().diff(Moment(token.iat * 1000));
    if (diff > ttl) {
        return callback(null, false);
    }
    callback(null, true, token);
};
// Plugins
/*server.register([{
    register: require('hapi-auth-jwt')
}], function (err) {
    server.auth.strategy('token', 'jwt', {
        validateFunc: validate,
        key: privateKey
    });

    server.route(Routes.endpoints);
});*/
var port = process.env.PORT || 8000;
server.register(Inert, function () {
  server.connection({ port: app.config.server.port });
  server.route( {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: { path: Path.normalize(__dirname + '/') }
    }
  });
  server.start(function() { console.log('Server started ', server.info.uri) });
}); // requires a callback function but can be blank
/*
server.start(function () {
    console.log('Server started ', server.info.uri);
});*/