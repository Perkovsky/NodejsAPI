const types = `
    type Group {
        _id: Int!
        ParentId: Int
        Name: String!
        Keywords: String
        PhotoUrl: String
    }
`

const queries = `
    groups(parentId: Int): [Group!]!
`

const mutations = ``

module.exports = { types, queries, mutations }
