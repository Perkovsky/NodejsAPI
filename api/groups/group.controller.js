const GroupService = require('./group.service')
    
exports.getGroups = async ctx => {
    const result = await GroupService.getGroups()
    ctx.status = 200
    ctx.body = result
}

exports.getGroupsByParentId = async ctx => {
    const { id } = ctx.params
    const result = await GroupService.getGroupsByParentId(+id)
    ctx.status = 200
    ctx.body = result
}
