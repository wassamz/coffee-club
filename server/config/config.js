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
        username: "test@test.com",
        password: "password",
        accountName: "Cronj",
        verifyEmailUrl: "verifyEmail"
    }
};