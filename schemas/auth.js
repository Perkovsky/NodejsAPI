const types = `
    type User {
        email: String!
        name: String!
        password: String!
    }

    type RegisterResponse {
        _id: String!
    }

    type LoginResponse {
        token: String!
    }
`

const queries = `
    login(email: String!, password: String!) : LoginResponse!
`

const mutations = `
    register(email: String!, name: String!, password: String!): RegisterResponse!
`

module.exports = { types, queries, mutations }
