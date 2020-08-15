const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = async (ctx, next) => {
    const auth = ctx.req.headers ? ctx.req.headers.authorization : null
    if (!auth) {
        ctx.status = 401
        ctx.body = 'Access token is missing or invalid.'
        return
    }

    const secret = config.authentication.jwtSecret
    const token = ctx.req.headers.authorization.split(" ")[1]

    jwt.verify(token, secret, async (err, decode) => {
        if (err) {
            ctx.status = 401
            ctx.body = 'Access token is missing or invalid.'
        } else {
            ctx.body = { user: decode }
            await next()
        }
    })
}
