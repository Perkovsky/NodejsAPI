const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = function (req, res, next) {
    const auth = req.headers ? req.headers.authorization : null
    if (!auth) {
        return res.status(401).send('Access token is missing or invalid.')
    }

    const secret = config.authentication.jwtSecret
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, secret, (err, decode) => {
        if (err) {
            res.status(401).send('Access token is missing or invalid.')
        } else {
            req.user = decode
            next()
        }
    })
}
