const Sequelize = require('sequelize')
const { or, like } = Sequelize.Op
const Product = require('../models/product')

class ProductService {
    async getProductsByGroupId(groupId) {
        return await Product.findAll({
            where: { 
                parentId: groupId
            },
            attributes: [
                ['Id', 'id'],
                ['ParentId', 'parentId'],
                ['Name', 'name'], 
                ['Price', 'price'],
                ['PhotoUrl', 'photoUrl']
            ]
        })
    }

    async getProductById(id) {
        return await Product.findByPk(id, {
            attributes: { exclude: ['BrandId'] },
            include: ['brand']
        })
    }

    async search(searchString, page, pageSize) {
        const regex = new RegExp('.*' + searchString + '.*' , 'i')
        return await Product.findAndCountAll({
            where: { 
                [or]: [
                    { name: { [like]: `%${searchString}%` } },
                    { description: { [like]: `%${searchString}%` } },
                    { keywords: { [like]: `%${searchString}%` } }
                ]
            },
            order: [
                ['name', 'ASC']
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            attributes: [
                ['Id', 'id'],
                ['ParentId', 'parentId'],
                ['Name', 'name'], 
                ['Price', 'price'],
                ['PhotoUrl', 'photoUrl']
            ]
        })
    }
}

module.exports = new ProductService()
