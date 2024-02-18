import {Model} = require("sequelize");
import {DataTypes} = require("sequelize");
import seqelize from

class User extends Model{

}

User.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,

    }
},{sequelize})

export default User;