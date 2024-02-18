require("dotenv").config();
const express = require("express");
const sequelize = require('./db.config');
const cors = require("cors");
const PORT = 9100;


const app = express();

app.use(cors());

app.get('/', (req,res) => {
    return res.json({
        message: "test"
    })
})


const start = async () => {
    try{
        await sequelize.authenticate()
        app.listen(PORT, () => console.log(`Server start at PORT: ` + PORT))
        await  sequelize.sync({ force: true });
    }catch (err){
        console.log(err);
    }
}

start()