const auth = require('./auth')
const group = require('./group')
const product = require('./product')
const order = require('./order')

module.exports = {
    ...auth,
    ...group,
    ...product,
    ...order
}
