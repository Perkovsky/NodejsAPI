const { gql } = require('apollo-server')
const auth = require('./auth')
const group = require('./group')
const product = require('./product')
const order = require('./order')

const types = []
const queries = []
const mutations = []
const schemas = [ auth, group, product, order ]

schemas.forEach(x => {
    if (x.types) types.push(x.types)
    if (x.queries) queries.push(x.queries)
    if (x.mutations) mutations.push(x.mutations)
})

// common types
let source = `
    scalar Date
`
if (types.length > 0) {
    source += `${types.join('\n')}`
}
if (queries.length > 0) {
    source += `
        type Query {
            ${queries.join('\n')}
        }
    `
}
if (mutations.length > 0) {
    source += `
        type Mutation {
            ${mutations.join('\n')}
        }
    `
}

module.exports = gql`${source}`
