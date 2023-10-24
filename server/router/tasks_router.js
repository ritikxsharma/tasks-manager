const express = require('express');
const router = express.Router()
const authValidator = require('../middlewares/validators/auth_validator')

const {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks_controller')

router.use(authValidator)
router.route('/tasks').get(getTasks).post(createTask)
router.route('/task/:id').get(getTask).put(updateTask).delete(deleteTask)

module.exports = router
