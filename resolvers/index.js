const auth = require('./auth')
const group = require('./group')
const product = require('./product')
const order = require('./order')

module.exports = {
    Query: {
        ...auth.queries,
        ...group.queries,
        ...product.queries,
        ...order.queries
    },
    Mutation: {
        ...auth.mutations,
        ...group.mutations,
        ...product.mutations,
        ...order.mutations
    }
}
