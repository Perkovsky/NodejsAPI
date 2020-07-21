const { createLogger, format, transports } = require('winston')
 
const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [ new transports.File({ dirname: './logs', filename: 'errors.log' }) ]
 })

module.exports = logger