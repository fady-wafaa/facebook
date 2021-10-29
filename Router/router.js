const userRouter = require("../modules/client/router/router.js");
const authRouter = require("../modules/auth/router/router");
const postsRouter = require("../modules/posts/router/router.js");
const AdminRouter = require("../modules/admin/router/router.js");




module.exports = {
    authRouter,
    userRouter,
    postsRouter,
    AdminRouter
}