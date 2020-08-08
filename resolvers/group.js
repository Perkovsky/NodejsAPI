const authenticated = require('./authGuard')
const GroupService = require('../services/groupService')

const queries = {
    groups: authenticated(async (_, {parentId}, context) => {
        if (parentId) {
            return await GroupService.getGroupsByParentId(+parentId)
        } else {
            return await GroupService.getGroups()
        }
    })
}

const mutations = {}

module.exports = { queries, mutations }
