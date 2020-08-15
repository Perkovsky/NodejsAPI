const config = require('./config')

module.exports = {
    definition: {
        openapi: '3.0.3',
        info: {
            version: `${config.version}.0.0`,
            title: 'Node.js API',
            description: 'Node.js API - a test project.',
            contact: {
                name: 'Igor Perkovsky',
                email: 'igor.v.perkovsky@gmail.com',
                url: 'https://iperkovsky.web.app/'
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: {
            bearerAuth: []
        }
    },
    apis: [
        './api/auth/auth.controller.js',
        './api/auth/user.model.js',
        './api/groups/group.controller.js',
        './api/groups/group.model.js',
        './api/products/product.controller.js',
        './api/products/product.model.js',
        './api/orders/order.controller.js',
        './api/orders/order.model.js'
    ]
  }
