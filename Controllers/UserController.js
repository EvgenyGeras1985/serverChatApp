const {User} = require("../models/models");
const ApiError = require("../Error/ApiError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController{
    async registration(req, res,next){
        try{
            const {mail, password,nickname} = req.body;

            if(!mail || !password) return res.json('Некорректный email или password');

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.create({
                mail,
                password: hashPassword,
                nickname
            },{fields:['mail','password','nickname']});


            const token = jwt.sign({
                    id:user.id,
                    mail:user.mail,
                    role:user.role
                },
                process.env.SECRET_KEY,
                {expiresIn: '2h'}
            );

            return res.json({token})
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
}

module.exports = new UserController();