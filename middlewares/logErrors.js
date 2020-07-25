const logger = require('../infrastructure/logger')
 
module.exports = function (err, req, res, next) {
    logger.error({
        description: err.message,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
        },
        status: err.status || 500,
        userAgent: req.headers['user-agent'],
        stackTrace: err.stack
    })
    next(err)
}
