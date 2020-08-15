const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const compress = require('koa-compress')()
const cors = require('@koa/cors')(/* Add your cors option */)
const helmet = require('koa-helmet')(/* Add your security option */)

// const swaggerUi = require('swagger-koa')
// const swaggerJSDoc = require('swagger-jsdoc')
// const swaggerConfig = require('./config/swaggerConfig')

const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('./config/config')
const logger = require('./infrastructure/logger')
const logErrors = require('./middlewares/logErrors')
const errorHandler = require('./middlewares/errorHandler')
const applyApiMiddleware = require('./api')
const app = new Koa()

mongoose.set('debug', true)

//// Swagger
//const swaggerSpec = swaggerJSDoc(swaggerConfig)
//app.use(config.swagger.uri, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//app.get('/', ctx => ctx.redirect(config.swagger.uri))

//app.use(morgan('tiny', { stream: logger.stream }))
app.use(logErrors)
app.use(errorHandler)
app.use(helmet)
app.use(compress)
app.use(cors)
app.use(bodyParser)

applyApiMiddleware(app)

// process.on('unhandledRejection', err => {
//     console.log(err.name, err.message)
//     console.log('UNHANDLED REJECTION! Shutting down...')
//     process.exit(1)
// })

async function start() {
    try {
        await mongoose.connect(config.db.connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(+config.port, config.host, () => console.log(`Server is running on port ${config.port}`))
    } catch (error) {
        logger.error(error.stack)
    }
}
start()
