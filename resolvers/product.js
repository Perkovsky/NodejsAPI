const config = require('../config/config')
const ProductService = require('../services/productService')

module.exports = {
    products: async ({groupId}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }
        return await ProductService.getProductsByGroupId(+groupId)
    },

    product: async ({id}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }
        return await ProductService.getProductById(+id)
    },

    search: async ({searchString, page, pageSize}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }

        const defaultPage = config.pagination.page
        const defaultPageSize = config.pagination.pageSize
        const maxPageSize = config.pagination.maxPageSize

        page = page > 0 ? page : defaultPage
        pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
            ? pageSize 
            : pageSize ? maxPageSize : defaultPageSize

        return await ProductService.search(searchString, +page, +pageSize)
    }
}
