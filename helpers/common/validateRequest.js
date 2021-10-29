
const {BAD_REQUEST} = require('http-status-codes')

const validateRequest = (schema) =>{
    return (req,res,next) =>{
        const arryError = [];
        ['body','params','query','headers','file'].forEach((key) =>{
            if(schema[key]){
                const validate = schema[key].validate(req[key]);
                if(validate.error){
                    arryError.push(validate.error.details[0].message);
                }
            }
        });
        if(arryError.length){
            return res.status(BAD_REQUEST).json({message :`Validation : ${arryError.join()}`})
        }else{
            next()
        }
    }
}

module.exports = validateRequest