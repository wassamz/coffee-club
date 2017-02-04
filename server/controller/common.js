
var nodemailer = require("nodemailer"),
    Config = require('../config/config'),
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr';


var privateKey = Config.key.privateKey;

// set up the Gmail token generator
var generator = require('xoauth2').createXOAuth2Generator({
    user: 'wassam@gmail.com',
    clientId: '117758495387-qfu1jhf4hl1aqum1v8321p3o66u1594l.apps.googleusercontent.com',
    clientSecret: '8fIwgK7fmnd6aY8cD4s5qc8j',
    refreshToken: '1/IV1_-Zbq-Kxu2R0Qs0iZ65Wa4UEu7H08nuOGdl0KHC151JWnI0DTCps2w_MiUTUG'
});

// listen for token updates
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

// create reusable transport method
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }   
});

// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log('ERROR: ' + error);
   } else {
        console.log('Server is ready to take our messages');
   }
});
exports.decrypt = function(password) {
    return decrypt(password);
};

exports.encrypt = function(password) {
    return encrypt(password);
};

exports.sentMailVerificationLink = function(user,token) {
    var from = Config.email.accountName+" Team<" + Config.email.username + ">";
    var mailbody = "<p>Thanks for Registering on "+Config.email.accountName+" </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://"+Config.server.host+":"+ Config.server.port+"/"+Config.email.verifyEmailUrl+"/"+token+"'>Verification Link</a></p>";
    mail(from, user.userName , "Account Verification", mailbody);
};

exports.sentMailForgotPassword = function(user) {
    var from = Config.email.accountName+" Team<" + Config.email.username + ">";
    var mailbody = "<p>Your "+Config.email.accountName+"  Account Credential</p><p>username : "+user.userName+" , password : "+decrypt(user.password)+"</p>";
    mail(from, user.userName , "Account password", mailbody);
};


// method to decrypt data(password) 
function decrypt(password) {
    var decipher = crypto.createDecipher(algorithm, privateKey);
    var dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

// method to encrypt data(password)
function encrypt(password) {
    var cipher = crypto.createCipher(algorithm, privateKey);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

exports.mail = function (sender, email, subject, mailbody) {
    var mailOptions = {
        from: sender, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: mailbody // plaintext body
        //html: mailbody,  // html body
    };

    console.log('Sending Mail');
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
    });

};
