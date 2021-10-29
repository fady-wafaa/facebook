
const connection = require('./helpers/config/config.js');

require("dotenv").config();;
const express = require('express');
const { authRouter, userRouter, postsRouter, AdminRouter } = require('./router/router.js');
const  path  = require('path');
const daliyEmail = require('./helpers/job/daily.js');




connection();


const app =express();


app.use(express.json());
app.use("/img", express.static(path.join(__dirname,"img")));
app.use("/imgUser", express.static(path.join(__dirname,"imgUser")));

app.use(authRouter ,userRouter ,postsRouter , AdminRouter)





app.listen(process.env.PORT , ()=> console.log(`raning server on ${process.env.PORT} ....`))