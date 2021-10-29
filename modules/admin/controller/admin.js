const {hashing} = require("../../../helpers/hashing/hashing.js");
const daliyEmail = require("../../../helpers/job/daily.js");
const { createInvoice, invoice } = require("../../../helpers/pdf/creat_pdf.js");
const advers = require("../../../models/advertising.schema");
const Report = require("../../../models/report.schema.js");
const UserSchema = require("../../../models/user.schema");

// ! addAdver
const addAdver = async(req,res)=>{
    try {
        const {title ,desc , img , createdBy} = req.body;
        const  adver = await advers.create({title , desc , img , createdBy});
        res.status(200).json({message:"Done",adver})
    } catch (error) {
        res.status(400).json({message:"error",error})
    }
};



// ! === |> ADD_ADMIN <|===

const addAdmin = async(req,res)=>{
    try {
        const {username,email,password,phone,location,roles , createdBy} = req.body;
      const user = await UserSchema.findOne({email});
      if(user){
          res.status(401).json({message:"email is aleardy exisst"});
      };
          const hashPassw = await hashing(password)
          const hashpho = await hashing(phone)
          const newUser = await UserSchema.create({username,email,phone:hashpho,password:hashPassw,location,roles ,createdBy});
         res.status(201).json({message:'success', newUser})
    

    } catch (error) {
        res.status(500).json({message:'error',error});
    }
}
// ! === |> Delete_ADMIN <|===

const deleteAdmin = async(req,res)=>{
    try {

        let admin = await UserSchema.findByIdAndUpdate(req.body.id,{isDelete:true},{new:true})
         res.status(200).json({message:'success Delete', admin})
    } catch (error) {
        res.status(400).json({message:'error',error});
    }
}


// ! ===> getAllAdmin==> Admin
const getAllAdmin = async(req,res)=>{
    try {
        const users = await UserSchema.find({roles:'admin',isDelete:false});
        res.status(200).json({message:"Done",users});
    } catch (error) {
        res.status(400).json({message:"error",error});
    }
}


// ! ===|> getAllUser <|=== 
const getAllUser = async(req,res)=>{
    try {
        const users = await UserSchema.find({isDelete:false});
        res.status(200).json({message:"Done",users});
    } catch (error) {
        res.status(400).json({message:"error",error});
    }
}
// ! ===|> getAllUserSAdmin <|=== 
const getAllUserSadmin = async(req,res)=>{
    try {
        const users = await UserSchema.find({});
        res.status(200).json({message:"Done",users});
    } catch (error) {
        res.status(400).json({message:"error",error});
    }
}


//! === |> getReport <| ===
const getReport = async(req,res)=>{
    try {
        const {id , action} = req.body
        const report = await Report.findById(id);
        const blokUser = await UserSchema.findByIdAndUpdate({_id:report.PostWriterID},{BlockPost:action},{new:true})
        res.status(200).json({message:"Done",report,blokUser});
    } catch (error) {
        res.status(400).json({message:"error",error});
    }
}

//! === |> Block user <| ===
const BlockUser = async(req,res) => {
    try {
        const {id,action} = req.body;
        const user = await UserSchema.findByIdAndUpdate({_id:id},{Block:action},{new:true});
        res.status(200).json({message:"Block Done",user})
    } catch (error) {
        res.status(400).json({message:"error",error})
    }
}




// ! === > creatUserPdf < ===
const creatUserPdf = async(req,res)=>{
    try {
        const users = await UserSchema.find({})

  createInvoice(users, "invoice.pdf");
   await daliyEmail()
  res.send("Done")

    } catch (error) {
        res.status(400).json({error})
    }
}








module.exports = {
    addAdver,
    addAdmin,
    getAllUser,
    getAllAdmin,
    deleteAdmin,
    getReport,
    BlockUser,
    BlockUser,
    getAllUserSadmin,
    creatUserPdf
}