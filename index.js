const { ApolloServer } = require("apollo-server")
const mongoose = require('mongoose')
const config = require('./config/config')
const typeDefs = require('./schemas/index')
const resolvers = require('./resolvers/index')
const logger = require('./infrastructure/logger')
const jwt = require('jsonwebtoken')

const app = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
        logger.error({
            description: error.message,
            stackTrace: error.extensions.exception.stacktrace
        })
        return ({
            message: error.message,
            locations: error.locations,
            stack: error.extensions.exception.stacktrace,
            path: error.path
        })
    },
    context: async ({req}) => {
        const auth = req.headers ? req.headers.authorization : null
        let error = null
        let user = null
        if (!auth) {
            error = 'Access token is missing or invalid.'
        }

        const secret = config.authentication.jwtSecret
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, secret, (err, decode) => {
            if (err) {
                error = 'Access token is missing or invalid.';
            } else {
                user = decode
            }
        })

        return { error, user }
    }
})
  
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
        app.listen().then(({url}) => {
            console.log(`Server listening on ${url}`)
        })
    } catch (error) {
        logger.error(error.stack)
    }
}
start()
