const { verifyToken } = require("../../../helpers/token/token");

const validateRequest = require('../../../helpers/common/validateRequest.js');
const { addPosts, editPost, deletePost, GetAllPostMy, userAllpostsUsers, addComment, allComment, addLiek, getOnePostMy } = require("../controller/posts");
const { addPost, edit, paramsID, add_Liek, AddComment } = require("../validation/validation");
const { ADD_POST, GET_ALL_POSTS, GET_POST, DELETE_POST, EDIT_POSTS, ADD_COMMENTT, ADD_LIEK, POST_MY } = require("../../endpoints");

const upload_posts = require("../../../util/upload_imgPost/util");
const cash = require("../../../helpers/Redis/cash");




const router = require("express").Router();




// 

router.post('/api/addPost',verifyToken(ADD_POST),upload_posts.array("imgPost",3), validateRequest(addPost),addPosts) //! ===|> addPosts

router.post('/api/addLiek',verifyToken(ADD_LIEK),validateRequest(add_Liek),addLiek) //! ===|> addComment
router.patch('/api/editPost/:idPost',verifyToken(EDIT_POSTS),upload_posts.array("imgPost",3), validateRequest(edit),editPost) //! ===|> editPost
router.patch('/api/deletePost/:id',verifyToken(DELETE_POST), validateRequest(paramsID),deletePost) //! ===|> deletePost
router.get('/api/GetAllPostMy/:id',verifyToken(GET_POST),validateRequest(paramsID),cash("posts"),GetAllPostMy) //! ===|> GetAllPostMy
router.get('/api/userAllpostsUsers',verifyToken(GET_ALL_POSTS),cash("posts"),userAllpostsUsers) //! ===|> user_AllpostsUsers

router.get('/api/getOnePostMy/:id', verifyToken(POST_MY),getOnePostMy) //! ===|> user_AllpostsUsers

router.post('/api/addComment',verifyToken(ADD_COMMENTT),validateRequest(AddComment),addComment) //! ===|> addComment
router.get('/api/allComment',allComment) //! ===|> user_AllpostsUsers


module.exports = router ;
// 