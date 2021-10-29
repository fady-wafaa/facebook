const multer = require("multer");

const storage =  multer.diskStorage({
  destination:  'img' ,
    filename: (req,file,cb)=>{
       
        cb(null, file.fieldname + new Date().toISOString().replace(/:/g, '_') + file.originalname )
    },
      
});

const upload_posts = multer({
  storage:storage,
  limits:{
    fileSize: 9000000000  
  }
  ,fileFilter: (req, file, cb) => {

    if (!file.originalname.match(/\.(PNG|jpg|jpeg)$/)) {
      return cb(new Error("please upload"));
    }
    cb(undefined,true);
  }


});
module.exports = upload_posts