const authenticated = require('./authGuard')
const config = require('../config/config')
const OrderService = require('../services/orderService')

const queries = {
    orders: authenticated(async (_, {page, pageSize}, context) => {
        const defaultPage = config.pagination.page
        const defaultPageSize = config.pagination.pageSize
        const maxPageSize = config.pagination.maxPageSize

        const userId = context.user.id

        page = page > 0 ? page : defaultPage
        pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
            ? pageSize 
            : pageSize ? maxPageSize : defaultPageSize

        return await OrderService.getOrders(userId, +page, +pageSize)
    }),

    order: authenticated(async (_, {id}, context) => {
        const userId = context.user.id 
        return await OrderService.getOrderById(userId, id)
    })
}

const mutations = {
    createOrder: authenticated(async (_, {items}, context) => {
        const userId = context.user.id
        const {id} = await OrderService.createOrder(userId, items)
        return id
    }),

    updateOrder: authenticated(async (_, {id, items}, context) => {
        const userId = context.user.id
        const result = await OrderService.updateOrder(userId, id, items)
        return result.id
    }),

    deleteOrder: authenticated(async (_, {id}, context) => {
        const userId = context.user.id 
        return await OrderService.deleteOrder(userId, id)
    })
}

module.exports = { queries, mutations }
