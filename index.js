const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const { graphqlHTTP } = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express').default
const schema = require('./schemas/index')
const resolver = require('./resolvers/index')
const logger = require('./infrastructure/logger')
const auth = require('./middlewares/auth')
const app = express()

app.use(morgan('tiny', { stream: logger.stream }))
app.use(express.json())
app.use(cors())
app.use(auth)

app.use('/graphql', graphqlHTTP(req => ({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
    context: {
        user: req.user,
        error: req.error
    },
    customFormatErrorFn: error => {
        logger.error({
            description: error.message,
            stackTrace: error.stack
        })
        return ({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path
        })
    }
})))
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

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
