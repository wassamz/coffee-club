module.exports = {
    server: {
        
            host: 'localhost',
            port: 8000
    },
    database: {
        host: 'ccdb',
        port: 27017,
        db: 'coffee-club',
        username: 'admin',
        password: 'manager'
    },
    key: {
        privateKey: '37LvDSm4XvjYOh9Y',
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    },
    email: {
        service: 'Gmail',
        username: 'your@gmail.com',
        clientId: 'clientid',
        clientSecret: 'secret',
        refreshToken: 'token',

        proxy: process.env.http_proxy,
        accountName: "Coffee Club",
        verifyEmailUrl: "verifyEmail",

        sender: this.accountName + ' <' + this.username + '>',
        subject: 'Your Coffee Buddy for this week',
        body: 'Hello, Please schedule time for coffee between '
    }
};
