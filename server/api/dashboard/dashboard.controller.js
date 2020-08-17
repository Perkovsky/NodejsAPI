const service = require('./dashboard.service')
    
exports.getCounters = async ctx => {
    const result = await service.getCounters()
    ctx.status = 200
    ctx.body = result
}
