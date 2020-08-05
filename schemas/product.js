const types = `
    type Brand {
        _id: Int!
        Name: String!
    }

    type Product {
        _id: Int!
        ParentId: Int!
        Name: String!
        Keywords: String
        Description: String
        Price: Float
        BrandProduct: Brand!
        StatusProduct: Int
        PhotoUrl: String
        PhotoUrlBig: String
        VideoUrl: String
        Availability: String
        WholesalePacking: Int
        LimitOrderDays: Int
    }
`

const queries = `
    products(groupId: Int!): [Product!]!
    product(id: Int!): Product!
    search(searchString: String!, page: Int, pageSize: Int): [Product!]!
`

const mutations = ``

module.exports = { types, queries, mutations }
