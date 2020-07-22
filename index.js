const express = require('express')
const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerConfig = require('./config/swaggerConfig')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
//import jsonwebtoken from 'jsonwebtoken'
const routes = require('./routes/index')
const logger = require('./infrastructure/logger')
const logErrors = require('./middlewares/logErrors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())

// Swagger
const swaggerSpec = swaggerJSDoc(swaggerConfig)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/', (req, res) => res.redirect('/api-docs'))


//TODO: 
//  JWT
//  CRUD Order


app.use('/api', routes)

app.use(logErrors)
app.use(errorHandler)
// process.on('unhandledRejection', err => {
//     console.log(err.name, err.message);
//     console.log('UNHANDLED REJECTION! Shutting down...');
//     //process.exit(1);
// });

async function start() {
    try {
        await mongoose.connect(config.db.connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(+config.port, config.host, () => console.log(`Server is running on port ${config.port}`))
    } catch (error) {
        console.log(error.stack)
        logger.error(error.stack)
    }
}
start()
