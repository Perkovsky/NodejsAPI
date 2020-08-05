const Group = require('../models/group')

class GroupService {
    async getGroups() {
        return await Group.find()
    }

    async getGroupsByParentId(parentId) {
        return await Group.find({ParentId: parentId})
    }
}

module.exports = new GroupService()
