const { AuthenticationError } = require("apollo-server")
const AuthService = require('../services/authService')

const queries = {
    login: async (_, {email, password}) => {
        const {error, token} = await AuthService.login(email, password)
        if (error) {
            throw new AuthenticationError(error)
        } else {
            return {token}
        }
    }
}

const mutations = {
    register: async (_, {email, name, password} ) => {
        const {id} = await AuthService.register(email, name, password)
        return {_id: id}
    }
}

module.exports = { queries, mutations }
