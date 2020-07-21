const express = require('express')
const GroupController = require('../controllers/groupController')
const router = express.Router()

router.route('/').get(GroupController.getGroups)
router.route('/:id/subgroups').get(GroupController.getGroupsByParentId)

module.exports = router