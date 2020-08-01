const User = require('../models/user')
const Product = require('../models/product')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')

class OrderService {
    async getOrders(userId, page, pageSize) {
        return await Order.findAll({
            where: { UserId: userId },
            order: [
                ['dateCreated', 'DESC']
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            attributes: [['Id', 'id'], 'dateCreated']
        })
    }

    async getOrderById(userId, id) {
        const result = await Order.findByPk(id, {
            attributes: { exclude: ['UserId'] },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [['Id', 'id'], 'name', 'email']
                },
                {
                    model: OrderItem,
                    as: 'orderItems',
                    attributes: [['Id', 'id'], 'count', 'price'],
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: [['Id', 'id'], 'name']
                        }
                    ]
                }
            ]
        })
        if (result && result.user.id == userId) {
            return result
        } else {
            return null
        }
    }

    async createOrder(userId, items) {
        const order = await Order.create({UserId: userId})
        if (order) {
            const orderItems = await OrderItem.bulkCreate(items.map(obj=> ({ ...obj, orderId: order.id })))
        }
        return order
    }

    async updateOrder(userId, id, items) {
        const result = await Order.update({dateModified: Date.now()}, {
            where: {
                Id: id,
                UserId: userId
            }
        })
        if (Array.isArray(result) && result[0] > 0) {
            await OrderItem.destroy({
                where: {
                    orderId: id
                }
            })
            const orderItems = await OrderItem.bulkCreate(items.map(obj=> ({ ...obj, orderId: id })))
            return {id}
        } else {
            return {}
        }
    }

    async deleteOrder(userId, id) {
        await Order.destroy({
            where: {
                Id: id,
                UserId: userId
            }
        })
        return { deletedCount: 1 }
    }
}

module.exports = new OrderService()
