const Group = require('../models/group')

class GroupService {
    async getGroups() {
        return await Group.findAll()
    }

    async getGroupsByParentId(parentId) {
        return await Group.findAll({
            where: { 
                parentId 
            },
            attributes: [
                ['Id', 'id'],
                ['ParentId', 'parentId'],
                ['Name', 'name'], 
                ['PhotoUrl', 'photoUrl']
            ]
        })
    }
}

module.exports = new GroupService()