const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports = {
    hashing:async(key)=>{
        const hash = await bcrypt.hash(key, Number(process.env.SALT));
        return hash
    },

    compareing: async(key , hashing)=>{
        const isMatched =  await bcrypt.compare(key , hashing);
          return isMatched
       }
    
};