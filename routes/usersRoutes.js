const Router = require("express");
const router = new Router();
const userController = require("../Controllers/UserController.js");

router.post('/registration', userController.registration)
router.post('/login', userController.userLog)
router.get('/auth', userController.userAuth)
//test route
router.get('/all', userController.getAll)

module.exports = router
