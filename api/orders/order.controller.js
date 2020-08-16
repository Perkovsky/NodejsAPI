const config = require('../../config/config')
const OrderService = require('./order.service')
    
exports.getOrders = async ctx => {
    const defaultPage = config.pagination.page
    const defaultPageSize = config.pagination.pageSize
    const maxPageSize = config.pagination.maxPageSize

    const userId = ctx.user.id
    let { page, pageSize } = ctx.query

    page = page > 0 ? page : defaultPage
    pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
        ? pageSize 
        : pageSize ? maxPageSize : defaultPageSize

    const result = await OrderService.getOrders(userId, +page, +pageSize)
    ctx.status = 200
    ctx.body = result
}

exports.getOrderById = async ctx => {
    const userId = ctx.user.id 
    const { id } = ctx.params
    const result = await OrderService.getOrderById(userId, id)
    if (result) {
        ctx.status = 200
        ctx.body = result
    } else {
        ctx.status = 404
        ctx.body = 'Order not found.'
    }
}

exports.createOrder = async ctx => {
    const userId = ctx.user.id
    const items = ctx.request.body.items
    const { id } = await OrderService.createOrder(userId, items)
    ctx.status = 201
    ctx.body = { id }
}

exports.updateOrder = async ctx => {
    const userId = ctx.user.id
    const orderId = ctx.params.id
    const items = ctx.request.body.items
    const { id } = await OrderService.updateOrder(userId, orderId, items)
    if (id) {
        ctx.status = 200
        ctx.body = { id }
    } else {
        ctx.status = 404
        ctx.body = 'Order not found.'
    }
}

exports.deleteOrder = async ctx => {
    const userId = ctx.user.id 
    const id = ctx.params.id
    const { deletedCount } = await OrderService.deleteOrder(userId, id)
    if (deletedCount > 0) {
        ctx.status = 204
    } else {
        ctx.status = 404
        ctx.body = 'Order not found.'
    }
}
