const Mongoose  = require("mongoose");

const userSchema = new Mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
            type:String,
            required:true,
            unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    location :{
        type:String,
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    roles:{
        type:String,
        default:'user'
    },
    createdBy :{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'user'
        
    },
    Block:{
        type:Boolean,
        default:false
    },
    
    BlockPost:{
        type:Boolean,
        default:false
    },
     confirmed:{
            type:Boolean,
            default:false
    },
    imgUser:{
        type:String
       
    }
    
},
{
    timestamps:true,
    
});


const UserSchema = Mongoose.model('user',userSchema);
module.exports = UserSchema