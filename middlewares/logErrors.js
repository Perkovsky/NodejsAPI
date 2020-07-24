const logger = require('../infrastructure/logger')
 
module.exports = function (err, req, res, next) {
    logger.error({
        request: {
            url: req.url,
            method: req.method,
            body: req.body
        },
        stackTrace: err.stack
    })
    console.error(err.stack)
    next(err)
}
