const sequelize = require("../db.config");

const {DataTypes} = require("sequelize");

const User = sequelize.define('user', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    mail: {type:DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: "USER"}
})

module.exports = {
    User
}