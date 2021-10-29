const validateRequest = require('../../../helpers/common/validateRequest');
const { verifyToken } = require('../../../helpers/token/token');
const { ADD_ADVER, ADD_ADMIN, GET_ALL_USERS ,GET_ALL_ADMIN, DELETE_ADMIN, BLOCK_USER, GET_REPORT, GET_ALL_USERS_SADMIN } = require('../../endpoints');
const { addAdver, addAdmin, getAllUser, getAllAdmin, deleteAdmin, getReport, BlockUser, getAllUserSadmin, creatUserPdf,  } = require('../controller/admin');
const { advertising, AddAdmin, DeleteAdmin, Block_Report } = require('../validation/admin.validetion');

const router = require('express').Router();









router.post('/api/addAdver',verifyToken(ADD_ADVER),validateRequest(advertising),addAdver);//! ===|> addAdver
router.post('/api/addAdmin',verifyToken(ADD_ADMIN),validateRequest(AddAdmin),addAdmin);//! ===|> addAdmin
router.get('/api/getAllUser',verifyToken(GET_ALL_USERS),getAllUser); //! ===|> getAllUser
router.get('/api/getAllUserSadmin',verifyToken(GET_ALL_USERS_SADMIN),getAllUserSadmin); //! ===|> getAllUser
router.get('/api/getAllAdmin',verifyToken(GET_ALL_ADMIN),getAllAdmin); //! ===|> getAllAdmin
router.get('/api/getReport',verifyToken(GET_REPORT),validateRequest(Block_Report),getReport); //! ===|> getReport
router.patch('/api/deleteAdmin',verifyToken(DELETE_ADMIN),validateRequest(DeleteAdmin),deleteAdmin); //! ===|> deleteAdmin
router.patch('/api/BlockUser',verifyToken(BLOCK_USER),validateRequest(Block_Report),BlockUser); //! ===|> deleteAdmin
router.get('/api/creatUserPdf',creatUserPdf) //! === > creatPdf




module.exports = router