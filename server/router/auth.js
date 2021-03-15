const router = require('express').Router()
const {signup} = require('../controllers/signup')
const {activateAccount} = require('../controllers/acivateAccount')
const {signin} = require('../controllers/signin')
const userCtrl = require('../controllers/users')
const {validatorSignup,validatorSignin} = require('../validator/indexValidator')
const {runValidator} = require('../validator/runValidator')
const {requireSignin,adminMiddleware} = require('../utils/minddleware')
router.post('/signup',validatorSignup,runValidator,signup)
router.post('/activate', activateAccount)
router.post('/signin', validatorSignin,runValidator,signin)
router.get('/listUser',requireSignin, adminMiddleware,userCtrl.listUser)
router.get('/listUserId/:id',requireSignin, userCtrl.listUserId)
router.put('/modifyUser/:id',requireSignin, userCtrl.modyfiUser)
router.put('/modifyRole/:id',requireSignin, adminMiddleware, userCtrl.modifyRole)
router.delete('/deleteUser/:id',requireSignin, adminMiddleware, userCtrl.deleteUser)
module.exports = router