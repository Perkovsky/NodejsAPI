const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const User = require('./user.model')

function getToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name
    }
    const secret = config.authentication.jwtSecret
    const options = { expiresIn: config.authentication.expiresIn }
    return jwt.sign(payload, secret, options)
} 

class AuthService {
    async register(email, name, password) {
        const user = new User({email, name, password})
        return await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) {
            return { error: 'Authentication failed.'}
        }

        const isValidPassword = await user.comparePassword(password)
        if (isValidPassword) {
            return { token: getToken(user) } 
        } else {
            return { error: 'Authentication failed.'}
        }
    }
}

module.exports = new AuthService()
