const config = require('../config/config')
const OrderService = require('../services/orderService')

module.exports = {
    orders: async ({page, pageSize}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }

        const defaultPage = config.pagination.page
        const defaultPageSize = config.pagination.pageSize
        const maxPageSize = config.pagination.maxPageSize

        const userId = context.user.id

        page = page > 0 ? page : defaultPage
        pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
            ? pageSize 
            : pageSize ? maxPageSize : defaultPageSize

        return await OrderService.getOrders(userId, +page, +pageSize)
    },

    order: async ({id}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }
        const userId = context.user.id 
        return await OrderService.getOrderById(userId, id)
    },

    createOrder: async ({items}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }
        const userId = context.user.id
        const {id} = await OrderService.createOrder(userId, items)
        return id
    },

    updateOrder: async ({id, items}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }
        const userId = context.user.id
        const result = await OrderService.updateOrder(userId, id, items)
        return result.id
    },

    deleteOrder: async ({id}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }
        const userId = context.user.id 
        return await OrderService.deleteOrder(userId, id)
    }
}
