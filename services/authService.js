const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user')

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
        const user = await User.create({email, name, password})
        return user
    }

    async login(email, password) {
        const user = await User.findOne({
            where: {
                email: email.toLowerCase()
            }
        })
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