const Router = require("express");
const router = new Router();
const usersRouter = require("./usersRoutes");

router.use('/users', (req,res) => {
    return res.json({message: "test reg"})
})

module.exports = router;