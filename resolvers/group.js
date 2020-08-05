const GroupService = require('../services/groupService')

module.exports = {
    groups: async ({parentId}, context) => {
        const {error} = context
        if (error) {
            throw new Error(error)
        }
        if (parentId) {
            return await GroupService.getGroupsByParentId(+parentId)
        } else {
            return await GroupService.getGroups()
        }
    }
}
