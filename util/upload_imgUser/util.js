const multer = require("multer");

const storage =  multer.diskStorage({
  destination:  'imgUser' ,
    filename:(req,file,cb)=>{
       
        cb(null, file.fieldname + new Date().toISOString().replace(/:/g, '_') + file.originalname )
    },
      
});

const upload_User = multer({
  storage:storage,
  limits:{
    fileSize: 5000000  
  }
  ,fileFilter: (req, file, cb) => {

    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("please upload"));
    }
    cb(undefined,true);
  }


});
module.exports = upload_User