const config = require('../../config/config')
const ProductService = require('./product.service')
    
exports.getProductsByGroupId = async ctx => {
    const { id } = ctx.params
    const result = await ProductService.getProductsByGroupId(+id)
    ctx.status = 200
    ctx.body = result
}

exports.getProductById = async ctx => {
    const { id } = ctx.params
    const result = await ProductService.getProductById(+id)
    if (result) {
        ctx.status = 200
        ctx.body = result
    } else {
        ctx.status = 404
        ctx.body = 'Product not found.'
    }
}

exports.search = async ctx => {
    const defaultPage = config.pagination.page
    const defaultPageSize = config.pagination.pageSize
    const maxPageSize = config.pagination.maxPageSize

    const { searchString } = ctx.params
    let { page, pageSize } = ctx.query

    page = page > 0 ? page : defaultPage
    pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
        ? pageSize 
        : pageSize ? maxPageSize : defaultPageSize

    const result = await ProductService.search(searchString, +page, +pageSize)
    ctx.status = 200
    ctx.body = result
}
