const {  DataTypes } = require("sequelize");
const sequelize = require("../db.config");

const User = sequelize.define("user", {
    id: {type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    mail: {type:DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING},
    img:{type: DataTypes.STRING, allowNull:false},
    role: {type:DataTypes.STRING, defaultValue: "USER"},
});

const Message = sequelize.define('message', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    user_id:{type:DataTypes.INTEGER, unique: true},
    date:{type:DataTypes.DATE, defaultValue: DataTypes.NOW},
    text: {type:DataTypes.STRING},

})

module.exports = {
    User,
    Message,
}



