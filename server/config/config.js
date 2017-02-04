module.exports = {
    server: {
        
            host: 'localhost',
            port: 8000
    },
    database: {
        host: '127.0.0.1',
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
        username: "wassam@gmail.com",
        password: "$",
        accountName: "Wassam",
        verifyEmailUrl: "verifyEmail",

        sender: 'Coffee Club <wassam@gmail.com>',
        subject: 'Your Coffee Club buddy for this week',
        body: 'Schedule time for coffee between '
    }
};
