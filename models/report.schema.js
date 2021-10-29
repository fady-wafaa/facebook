const Mongoose  = require("mongoose");

const reportSchema = new Mongoose.Schema({
    Comment:{
        type:String,
        required:true
    },
    PostWriterID:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    postID:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'posts'
        
    },
    createByReport:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},
{
    timestamps:true,
    
});


const Report = Mongoose.model('report',reportSchema);
module.exports = Report