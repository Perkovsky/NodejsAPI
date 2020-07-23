module.exports = {
    definition: {
        openapi: '3.0.3',
        info: {
            version: '1.0.0',
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
        './controllers/authController.js',
        './controllers/groupController.js',
        './controllers/productController.js',
        './models/user.js',
        './models/group.js',
        './models/product.js'
    ]
  }
