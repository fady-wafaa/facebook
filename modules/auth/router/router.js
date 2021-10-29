const router = require("express").Router();
const validateRequest = require('../../../helpers/common/validateRequest.js');
const { signINValidate, logInValidate } = require("../validation/auth.validetion.js");
const { addUser , logIn, logInEmail, GoogleLogin} = require('../controller/auth.js');


router.post('/api/signUp',validateRequest(signINValidate), addUser ); //! ===|> addUser

router.post('/api/logIn',validateRequest(logInValidate),logIn);//! ===|> LogIn
router.get('/virfiy/:token',logInEmail);//! ===|> LogIn

router.post('/api/GoogleLogin',GoogleLogin);//! ===|> GoogleLogin

module.exports = router ;