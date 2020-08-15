const mongoose = require('mongoose')
const Group = require('./group.model')

class GroupService {
    async getGroups() {
        return await Group.find()
            .select('_id ParentId Name PhotoUrl')
    }

    async getGroupsByParentId(parentId) {
        return await Group.find({ParentId: parentId})
            .select('_id ParentId Name PhotoUrl')
    }
}

module.exports = new GroupService()
