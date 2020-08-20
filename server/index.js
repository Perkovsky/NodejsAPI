const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const compress = require('koa-compress')()
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const mongoose = require('mongoose')
const morgan = require('koa-morgan')
const config = require('./config/config')
const logger = require('./infrastructure/logger')
const logErrors = require('./middlewares/logErrors')
const errorHandler = require('./middlewares/errorHandler')
const dashboardService = require('./api/dashboard/dashboard.service')
const applyApiMiddleware = require('./api')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server, { origins: 'localhost:*' })

mongoose.set('debug', true)

app.use(morgan('tiny', { stream: logger.stream }))
app.use(logErrors)
app.use(errorHandler)
app.use(helmet())
app.use(compress)
app.use(cors())
app.use(bodyParser)

applyApiMiddleware(app)

// Socket.io
let interval
io.on("connection", (socket) => {
    logger.info("Socket.io: new client has been connected")
    if (interval) {
        clearInterval(interval)
    }
    interval = setInterval(() => getDashboard(socket), 3000)
    socket.on("disconnect", () => {
        logger.info("Socket.io: client has been disconnected")
        clearInterval(interval)
    })
})
const getDashboard = async (socket) => {
    const data = await dashboardService.getCounters()
    socket.emit("dashboard.updated", { data })
}

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
        server.listen(+config.port, config.host, () => logger.info(`Server is running on port ${config.port}`))
    } catch (error) {
        logger.error(error.stack)
    }
}
start()
