const authenticated = require('./authGuard')
const config = require('../config/config')
const ProductService = require('../services/productService')

const queries = {
    products: authenticated(async (_, {groupId}, context) => {
        return await ProductService.getProductsByGroupId(+groupId)
    }),

    product: authenticated(async (_, {id}, context) => {
        return await ProductService.getProductById(+id)
    }),

    search: authenticated(async (_, {searchString, page, pageSize}, context) => {
        const defaultPage = config.pagination.page
        const defaultPageSize = config.pagination.pageSize
        const maxPageSize = config.pagination.maxPageSize

        page = page > 0 ? page : defaultPage
        pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
            ? pageSize 
            : pageSize ? maxPageSize : defaultPageSize

        return await ProductService.search(searchString, +page, +pageSize)
    })
}

const mutations = {}

module.exports = { queries, mutations }
