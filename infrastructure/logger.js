const { createLogger, format, transports } = require('winston')
 
const errorStackTracerFormat = format(info => {
    const level = info[Symbol.for('level')]
    const message = info[Symbol.for('message')]
    if (level === 'error') {
        try {
            const newMessage = JSON.parse(message)
            if (newMessage.message && newMessage.message.stackTrace) {
                info.message = newMessage.message.stackTrace
            }
        } catch (error) {
            // do nothing
        }
    }
    return info
})

const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.padLevels(),
                errorStackTracerFormat(),
                format.simple()
            ),
            handleExceptions: false
        }),
        new transports.File({ 
            level: 'error',
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            dirname: './logs',
            filename: 'errors.log',
            handleExceptions: true
        }) 
    ],
    exitOnError: false
})

logger.stream = {
    write: message => logger.info(message)
}

module.exports = logger
