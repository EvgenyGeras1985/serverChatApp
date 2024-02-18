require("dotenv").config();
require('./models/models');
const express = require("express");
const router = require("./routes/index");
const sequelize = require('./db.config');
const cors = require("cors");
const errorHandler = require("./middleware/errorHandlingMiddleWare");

const PORT = 9100;


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);


const start = async () => {
    try{
        await sequelize.authenticate()
        app.listen(PORT, () => console.log(`Server start at PORT: ` + PORT));
        await  sequelize.sync({ alter: true });
    }catch (err){
        console.log(err);
    }
}

start()