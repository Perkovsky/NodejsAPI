const GroupService = require('../services/groupService')
    
class GroupController {

    /**
    * @swagger
    * /api/groups:
    *   get:
    *     tags:
    *      - groups
    *     summary: Get all groups
    *     description: Returns groups
    *     produces:
    *      - application/json
    *     responses:
    *       200:
    *         description: groups
    *         schema:
    *           type: array
    *           items:
    *             $ref: '#/definitions/Group'
    */
    async getGroups(req, res, next) {
        try {
            const result = await GroupService.getGroups()
            return res.status(200).send({result})
        } catch (error) {
            next(error)
        }
    }

    /**
    * @swagger
    * /api/groups/{id}/subgroups:
    *   get:
    *     tags:
    *      - groups
    *     summary: Get groups by parent ID
    *     description: Returns groups by parent ID
    *     produces:
    *      - application/json
    *     parameters:
    *       - name: id
    *         description: parent ID
    *         in: path
    *         required: true
    *         type: integer
    *         format: int64
    *     responses:
    *       200:
    *         description: groups
    *         schema:
    *           type: array
    *           items:
    *             $ref: '#/definitions/Group'
    */
    async getGroupsByParentId(req, res, next) {
        try {
            const result = await GroupService.getGroupsByParentId(+req.params.id)
            return res.status(200).send({result})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new GroupController()
