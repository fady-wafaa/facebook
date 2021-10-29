const jwt = require('jsonwebtoken');
require('dotenv').config();
const rbac = require('../Auth/rbac/rbac');



// ! === |> signToken <| ===
exports.signToken = async(payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:process.env.expiresIn} );
};



// ! === |> verifyToken <| ===
exports.verifyToken = (endPoint)=>{

  return async(req,res,next)=>{

    if(req.headers.authorization ){
      const token =req.headers.authorization.split(' ')[1];

      if(token){
      try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
    
        const isRoles = await rbac.can(decoded.roles, endPoint);
        if(isRoles){
          next()
        }else{
          res.status(401).json({message:"unauthoraizted"})
        }
      } catch (error) {
        res.status(400).json({message:error})
      }

      }else{
        res.status(401).json({message:"unauthoraizted"})
      }

    }else{
      res.status(401).json({message:"unauthoraizted"})
    }


  }
}





