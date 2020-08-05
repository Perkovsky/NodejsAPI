const { buildSchema } = require('graphql')
const auth = require('./auth')
const group = require('./group')
const product = require('./product')

const types = []
const queries = []
const mutations = []
const schemas = [ auth, group, product ]

schemas.forEach(x => {
    if (x.types) types.push(x.types)
    if (x.queries) queries.push(x.queries)
    if (x.mutations) mutations.push(x.mutations)
})

let source = types.length > 0 ? `${types.join('\n')}` : ``
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

module.exports = buildSchema(source)
