const  Mongoose  = require("mongoose");

const dovenv = require('dotenv');

dovenv.config();


const connection = async() => {
    try {
        await Mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connection