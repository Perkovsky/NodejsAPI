const controller = require('./group.controller')
const auth = require('../../middlewares/auth')

module.exports = Router => {
    const router = new Router({
        prefix: `/groups`
    })

    router.get('/', auth, controller.getGroups)
    router.get('/:id/subgroups', auth, controller.getGroupsByParentId)

    return router
}
