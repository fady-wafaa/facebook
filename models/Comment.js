const  Mongoose  = require("mongoose");

const CommentSchema = new Mongoose.Schema({
    comment:{
        type:String
    },
    createdBy:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    postID:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:true
    }
},{
    timestamps:true
})

const Comment = Mongoose.model("comment",CommentSchema);
module.exports = Comment