const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    db: {
        connectionString: process.env.MONGODB_URI
    },
    pagination: {
        page: 1,
        pageSize: 25,
        maxPageSize: 100
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET,
        expiresIn: '1h'
    }
}
