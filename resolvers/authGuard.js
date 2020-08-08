const { AuthenticationError } = require("apollo-server")

module.exports = next => (root, args, context, info) => {
    const {error} = context
    if (error) {
        throw new AuthenticationError(error)
    }
    return next(root, args, context, info)
}
