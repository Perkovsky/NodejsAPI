const auth = require('./auth')
const group = require('./group')
const product = require('./product')

module.exports = {
    ...auth,
    ...group,
    ...product
}
