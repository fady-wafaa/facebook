const { verifyToken } = require("../../../helpers/token/token");
const { updateProfile, updatepassword, deactivateAccount,  getAdver, addReport, GetProfile } = require("../controller/user.controller");
const { proflie,  PasswordUpdate, AddReporT } = require("../validation/user.validetion.js");
const validateRequest = require('../../../helpers/common/validateRequest.js');
const {  GET_ADVER, ADD_REPORT, SOFT_DELET, UPDATE_USER, UPDATE_PASSWORD, UPDATE_PROFILE, GET_PROFILE } = require("../../endpoints");
const upload_User = require("../../../util/upload_imgUser/util");


const router = require("express").Router();






router.patch('/api/updateProfile/:id' ,verifyToken(UPDATE_PROFILE),upload_User.single("imgUser"), validateRequest(proflie),updateProfile) //! ===|> updateProfile <|=== //
router.put('/api/updatepassword/:id' ,verifyToken(UPDATE_PASSWORD), validateRequest(PasswordUpdate),updatepassword) //! ===|> updateProfile <|=== //
router.patch('/api/deactivateAccount/:id',verifyToken(SOFT_DELET),deactivateAccount); //! ===|> deactivateAccount
router.post('/api/addReport',verifyToken(ADD_REPORT), validateRequest(AddReporT),addReport); //! ===|> addReport
router.get('/api/getAdver',verifyToken(GET_ADVER),getAdver); //! ===|> getAllUser
router.get('/api/GetProfile',verifyToken(GET_PROFILE),GetProfile); //! ===|> GetProfile

module.exports = router ;