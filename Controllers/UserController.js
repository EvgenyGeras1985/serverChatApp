const {User} = require("../models/models");
const ApiError = require("../Error/ApiError");
const path = require("path");
const uuid = require("uuid");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");


class UserController{
    async registration(req, res,next){
        try{
            const {mail, password,nickname} = req.body;
            // const {img} = req.files;
            // let fileName = uuid.v4() + ".jpg";
            // img.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(!mail || !password) {
                return next(ApiError.badRequest('Not correct mail or pass'))
            }

            const candidate = await User.findOne({
                where: {
                    mail: mail
                }
            })

            if(candidate){
                return next(ApiError.badRequest('Такой пользователь уже существует'))
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.create({
                mail,
                password: hashPassword,
                nickname,
                // img: fileName
            },{fields:['mail','password','nickname']});


            const token = jwt.sign({
                    id: user.id,
                    mail: user.mail,
                    role: user.role
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
        try{
            const { password, mail } = req.body;

            if(!mail || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }

            const candidate = await User.findOne({
                where: {
                    mail: mail
                }
            })

            if(!candidate){
                return next(ApiError.badRequest('Пользователь не зарегестрирован'))
            }
            let comparePassword = bcrypt.compareSync(password, candidate.password);
            if(!comparePassword){
                return  next(ApiError.badRequest('Пароль не верный'))
            }
            const token = jwt.sign({
                    id:candidate.id,
                    mail:candidate.mail,
                    role:candidate.role
                },
                process.env.SECRET_KEY,
                {expiresIn: '2h'}
            )
            return res.json({token})

        }catch (err){
            next(ApiError.badRequest(err.message))
        };
    }

    async userAuth(req, res, next){
        try{
            const {id} = req.query;
            if(!id){
               return next(ApiError.badRequest("ID не указан wow"))
            }
            res.json(id);
        }catch (err){

        };
    }
}

module.exports = new UserController();