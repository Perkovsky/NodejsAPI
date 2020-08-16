const logger = require('../infrastructure/logger')
 
module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        logger.error({
            description: err.message,
            request: {
                ip: ctx.req.ip,
                method: ctx.req.method,
                url: ctx.req.originalUrl,
            },
            status: err.status || 500,
            userAgent: ctx.req.headers['user-agent'],
            stackTrace: err.stack
        })
    }
}

