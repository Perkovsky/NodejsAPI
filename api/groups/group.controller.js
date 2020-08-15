const GroupService = require('./group.service')
    
/**
* @swagger
* /api/groups:
*   get:
*     tags:
*      - groups
*     security:
*      - bearerAuth: []
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
*       401:
*         description: access token is missing or invalid
*       500:
*         description: internal server error
*/
exports.getGroups = async ctx => {
    const result = await GroupService.getGroups()
    ctx.status = 200
    ctx.body = result
}

/**
* @swagger
* /api/groups/{id}/subgroups:
*   get:
*     tags:
*      - groups
*     security:
*      - bearerAuth: []
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
*       401:
*         description: access token is missing or invalid
*       500:
*         description: internal server error
*/
exports.getGroupsByParentId = async ctx => {
    const { id } = ctx.params
    const result = await GroupService.getGroupsByParentId(+id)
    ctx.status = 200
    ctx.body = result
}
