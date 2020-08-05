const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = function (req, res, next) {
    const auth = req.headers ? req.headers.authorization : null
    if (!auth) {
        req.error = 'Access token is missing or invalid.'
        return next()
    }

    const secret = config.authentication.jwtSecret
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, secret, (err, decode) => {
        if (err) {
            req.error = 'Access token is missing or invalid.'
            return next()
        }
        req.user = decode
        next()
    })
}
