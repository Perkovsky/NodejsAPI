const express = require('express')
const auth = require('../middlewares/auth')
const GroupController = require('../controllers/groupController')
const router = express.Router()

router.route('/').get(auth, GroupController.getGroups)
router.route('/:id/subgroups').get(auth, GroupController.getGroupsByParentId)

module.exports = router