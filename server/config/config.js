const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    version: 1,
    host: process.env.HOST,
    port: process.env.PORT,
}
