const {Sequelize} = require('sequelize');

//import ORM lib to connect with mySql dataBase on my HOST

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PROT
    }
)