// const req = require("express/lib/request");
const Comment = require('../../../models/Comment.js');
const Liek = require('../../../models/liek.js');
const PostSchema = require('../../../models/posts.schema.js')
const UserSchema = require("../../../models/user.schema.js");

const redis = require("redis");

const client = redis.createClient(6379);
require('dotenv').config();


//TODO: ===|> addPosts
const addPosts = async(req,res)=>{
    try {
        const { createdBy , title , desc } = req.body ;
        const  URLS = [];
        if(req.files){

           URLS.push(...req.files.map( x => process.env.PATH_IMG_POST + (x.filename)))
        }
        console.log( URLS)
        const user = await UserSchema.findById(createdBy);

        if(user.BlockPost === 'true' || user.Block === 'true'){
            res.status(400).json({message:"Not allowed to post"})
        }

            let data = await PostSchema.create({title , desc, createdBy,imgPost:URLS})
          let allData =  await data.populate({path:'createdBy',select:['_id','username','email','location']});
            // await data
            res.status(200).json({message:"seccuss", allData})

    } catch (error) {
     
        res.status(400).json({message:"error", error})

    }
};


//TODO: ===|> editPost
const editPost = async(req,res)=>{
    try {
        const {title, desc ,idUser,imgPost } = req.body;
        
        const user = await UserSchema.findById(idUser);

        if(user.BlockPost || user.Block ){
            res.status(400).json({message:"Not allowed to post"})
        }
        let post = await PostSchema.findById(req.params.idPost)
        if(!post){
            res.json({message:"invalid Post"})
        }
        let  URLS = imgPost;
        if(req.files){
              URLS = []
           URLS.push(...req.files.map( x => process.env.PATH_IMG_POST + (x.filename)))
             
        }
      
        const upDate =  {...(title && {title} ) , ...(desc &&{desc}) ,...(URLS.length >= 1 ? {imgPost:URLS} : {imgPost} ) };
        
        console.log(upDate)
        const data = await PostSchema.findByIdAndUpdate(req.params.idPost,upDate,{new:true});
        res.status(200).json({message:"success",data})
    } catch (error) {
        res.status(400).json({message:"error", error})
    }
}

//TODO: ===|> deletePost

const deletePost = async(req,res)=>{
    try {
        const user = await UserSchema.findById(req.params.id);
        //! Not allowed to post
        if(user.Block === true){
            res.status(400).json({message:"Not allowed to post"})
        }
        const data = await PostSchema.findOneAndUpdate(req.body.id,{isDelete:true},{new:true});
        res.status(200).json({message:"success",data})
    } catch (error) {
        res.status(400).json({message:"error", error})
    }
}

//! === |> userAllpostsUsers <| ===
const userAllpostsUsers = async(req,res)=>{
    try {
       const ArrayComment = []
        for await (const doc of await PostSchema.find({}).populate({path:'createdBy',select:['_id','username','imgUser']}).cursor()) {
            const comments = await Comment.find({postID:doc._id}).populate({path:'createdBy',select:['_id','username','imgUser'],})
            const liek = await Liek.find({postID:doc._id}).populate({path:'createdBy',select:['_id','username','imgUser'],})
                const obj = {...doc._doc,comments,liek}
            ArrayComment.push(obj)

          }
          client.setex("posts",30,JSON.stringify(ArrayComment))
        res.status(200).json({message:"Done",ArrayComment})
    } catch (error) {
        res.status(400).json({message:"error",error})
    }
}


//TODO: ===|> GetAllPostMy

const GetAllPostMy = async(req,res) =>{
    try {
        const user = await UserSchema.findById(req.params.id);
        //! Not allowed to post
        if(user.Block === true){
            res.status(400).json({message:"Not allowed to post"})
        }
        const post = await PostSchema.find({createdBy:req.params.id,isDelete:false}).populate({path:'createdBy',select:['_id','username','email','location']});
        client.setex("posts",30,JSON.stringify(post))
        res.status(200).json({message:"Done",post})

    } catch (error) {
        res.status(400).json({message:"error",error})
    }
}

//TODO: ===|> getOnePostMy
const getOnePostMy = async(req,res)=>{
    try {
        const {postID} = req.params
        const {userID} = req.body
        const user = await UserSchema.findById(userID);
        //! Not allowed to post
        if(user.Block === true){
            res.status(400).json({message:"Not allowed to post"})
        }
        // 
         const post = await PostSchema.findOne({id:postID}).populate({path:'createdBy',select:['_id','username','email','location']});
        res.status(200).json({message:"Done",post})

    } catch (error) {
        res.status(400).json({message:"error",error})
    }
}


// ! === |> get All comments <| ===
const allComment = async(req,res)=>{
    try {
        const comment = await Comment.find({}).populate({path:"postID" ,match:{isDelete:{$eq:false}}})

        const comments =  comment.filter( x => x.postID !== null ? x :  '')
        res.status(200).json({message:"Done",comments})
    } catch (error) {
        res.status(400).json({message:"error",error})
    }
}


// ! === |> add Comment <| ===
const addComment = async(req,res)=>{
    try {
        const {comment,createdBy,postID}= req.body;
        const CommentPost = await Comment.create({comment,createdBy,postID})

        res.status(200).json({message:"success",CommentPost})
    } catch (error) {
        res.status(400).json({message:"error",error})
    }
}






// ! === |> add Liek <| ===
const addLiek = async(req,res)=>{
    try {
        const {liek,createdBy,postID}= req.body;
        const liekPost = await Liek.create({liek,createdBy,postID})
        res.status(200).json({message:"success",liekPost})
    } catch (error) {
        res.status(400).json({message:"error",error})
    }
}

// // ! === |> GIT Liek <| ===





module.exports ={
    addPosts,
    editPost,
    deletePost,
    GetAllPostMy,
    userAllpostsUsers,
    addComment,
    allComment,
    addLiek,
    getOnePostMy
}