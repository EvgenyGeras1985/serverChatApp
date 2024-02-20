const {User} = require("../models/models");
const ApiError = require("../Error/ApiError");
const path = require("path");
const uuid = require("uuid");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController{
    async registration(req, res,next){
        try{
            const {mail, password,nickname} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(!mail || !password) return res.json('Некорректный email или password');

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.create({
                mail,
                password: hashPassword,
                nickname,
                img: fileName
            },{fields:['mail','password','nickname', "img"]});


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
            next(ApiError.badRequest(err.message))
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