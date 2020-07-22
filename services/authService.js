const mongoose = require('mongoose')
const User = require('../models/user')

class AuthService {
    async register(email, name, password) {
        const user = new User({email, name, password})
        return await user.save()
    }
}

module.exports = new AuthService()