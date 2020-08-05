const AuthService = require('../services/authService')

module.exports = {
    register: async ({email, name, password} ) => {
        const {id} = await AuthService.register(email, name, password)
        return {_id: id}
    },

    login: async ({email, password}) => {
        const {error, token} = await AuthService.login(email, password)
        if (error) {
            throw new Error(error)
        } else {
            return {token}
        }
    }
}
