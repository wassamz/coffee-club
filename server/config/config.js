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
        username: 'dfcoffeeclub@gmail.com',
        clientId: '760946986003-2e93kcoiot8pa54tc5uo8923a07r9k2g.apps.googleusercontent.com',
        clientSecret: 'tPCIZFiN_GpEZ64WtE63ZoOX',
        refreshToken: '1/6d2W8QllSZa71AlXbnFhaod89lxV0yuLOeCF2j5throBEP8DlpBEoD_fyQS084NK',

        accountName: "Coffee Club",
        verifyEmailUrl: "verifyEmail",

        sender: this.accountName + ' <' + this.username + '>',
        subject: 'Your Coffee Club buddy for this week',
        body: 'Schedule time for coffee between '
    }
};
