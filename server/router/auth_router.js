const express = require('express');
const router = express.Router()
const authValidator = require('../middlewares/validators/auth_validator')
const{
    login,
    register,
    deleteUser,  
    getUsers,
    currentUser
} = require('../controllers/auth_controller')

router.route('/getUsers').get(getUsers)
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/deleteUser/:id').delete(deleteUser)
router.route('/current').get(authValidator, currentUser)


module.exports = router