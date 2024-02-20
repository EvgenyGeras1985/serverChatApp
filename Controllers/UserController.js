const {User} = require("../models/models");
const ApiError = require("../Error/ApiError");

class UserController{
    async registration(req, res,next){
        try{
            // const {mail, password} = req.body;
            const user = await User.create({
                mail: req.body.mail,
                password: req.body.password,
                nickname: req.body.nickname
            })
            return res.json({message:"done"})
        }catch(err){
            console.log(err);
        }
    }

    async userLog(req, res, next){
        return console.log("user log");
    }

    async userAuth(req, res, next){
        return console.log("test user Auth");
    }

    async getAll(req,res,next){
        const users = await User.findAll()
        return res.json(users);
    }
}

module.exports = new UserController();