
var Hapi = require('hapi'),
    Db = require('./config/db'),
    Moment = require('moment'),
    Config = require('./config/config');

var User      = require('./controller/user');
var PairUp    = require('./controller/pair-up');
var Member    = require('./controller/member');
var Static    = require('./static');


var Path = require('path');

var app = {};
app.config = Config;

var privateKey = app.config.key.privateKey;
var ttl = app.config.key.tokenExpiry;


var server = new Hapi.Server();
server.connection({ port: app.config.server.port });

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
server.register([{
    register: require('hapi-auth-jwt')
}], function (err) {
    server.auth.strategy('token', 'jwt', {
        validateFunc: validate,
        key: privateKey
    });

});

//server.route({ method: 'GET',  path: '/{somethingss*}', config: Static.get });
server.route({ method: 'POST', path: '/user', config: User.create});
server.route({ method: 'POST', path: '/login', config: User.login});
server.route({ method: 'POST', path: '/forgotPassword', config: User.forgotPassword});
server.route({ method: 'POST', path: '/verifyEmail', config: User.verifyEmail});
server.route({ method: 'POST', path: '/resendVerificationEmail', config: User.resendVerificationEmail});
server.route({ method: 'GET', path: '/pairNow', config: PairUp.pairNow});
server.route({ method: 'POST', path: '/createMember', config: Member.create});

server.start((err)=> {
    if(err) {
        throw err;
    }
    console.log('Server started ', server.info.uri);
});


PairUp.pairAndEmail();
