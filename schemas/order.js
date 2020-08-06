const types = `
    input OrderItemInput {
        productId: Int!
        count: Int
        name: String!
        price: Float!
    }

    type OrderItem {
        _id: ID!
        productId: Int!
        name: String!
        count: Int!
        price: Float!
    }

    type Order {
        _id: ID!
        userId: ID!
        dateCreated: String!
        dateModified: String!
        items: [OrderItem!]!
    }
`

const queries = `
    orders(page: Int, pageSize: Int): [Order!]!
    order(id: String!): Order!
`

const mutations = `
    createOrder(items: [OrderItemInput!]!): String!
    updateOrder(id: String!, items: [OrderItemInput!]!): String!
    deleteOrder(id: String!): Boolean!
`
module.exports = { types, queries, mutations }
