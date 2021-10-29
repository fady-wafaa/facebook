const redis = require("redis");
const client = redis.createClient(6379);



const cash = (key) =>{
    return (req,res,next)=>{
        client.get(key,(err,data)=>{
            if(err) throw err;
            if (data != null){
                res.status(200).json({message:"success",data:JSON.parse(data)})
            }else{
                next()
            }
        })
    }
};


module.exports = cash