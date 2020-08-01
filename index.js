const express = require('express')
const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerConfig = require('./config/swaggerConfig')
const sequelize = require('./models/index')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const routes = require('./routes/index')
const logger = require('./infrastructure/logger')
const logErrors = require('./middlewares/logErrors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(morgan('tiny', { stream: logger.stream }))
app.use(express.json())
app.use(cors())

// Swagger
const swaggerSpec = swaggerJSDoc(swaggerConfig)
app.use(config.swagger.uri, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/', (req, res) => res.redirect(config.swagger.uri))

app.use('/api', routes)

app.use(logErrors)
app.use(errorHandler)
// process.on('unhandledRejection', err => {
//     console.log(err.name, err.message)
//     console.log('UNHANDLED REJECTION! Shutting down...')
//     process.exit(1)
// })

async function start() {
    try {
        await sequelize.sync()
        app.listen(+config.port, config.host, () => console.log(`Server is running on port ${config.port}`))
    } catch (error) {
        logger.error(error.stack)
    }
}
start()
