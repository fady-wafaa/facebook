const Mongoose  = require("mongoose");

const postsSchema = new Mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imgPost:{
        type:Array
      
    },
    desc:{
            type:String,
            required:true,
    },
    createdBy :{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    isDelete:{
        type:Boolean,
        default:false
    }


},
{
    timestamps:true
});


const PostSchema = Mongoose.model('posts',postsSchema);
module.exports = PostSchema