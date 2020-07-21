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
            schemas: {},
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [
        './models/group.js',
        './models/product.js',
        './controllers/groupController.js',
        './controllers/productController.js'
    ]
  }
