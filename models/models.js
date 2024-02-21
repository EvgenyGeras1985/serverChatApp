const {  DataTypes } = require("sequelize");
const sequelize = require("../db.config");

const User = sequelize.define('user', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    mail: {type:DataTypes.STRING},
    nickname: {type:DataTypes.STRING},
    password: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: "USER"}
})

const Message = sequelize.define('message', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    user_id:{type:DataTypes.INTEGER},
    date:{type:DataTypes.DATE, defaultValue: DataTypes.NOW},
    text: {type:DataTypes.STRING},

})

module.exports = {
    User,
    Message,
}



