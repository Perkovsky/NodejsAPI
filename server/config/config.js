const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    version: 1,
    host: process.env.HOST,
    port: process.env.PORT,
    db: {
        connectionString: process.env.MONGODB_URI
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET,
        expiresIn: '1h'
    }
}
