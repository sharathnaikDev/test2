const express = require('express');
const {register, login, getMyProfile, updateDetails, forgotPassword} = require('../controller/auth.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware')

router.post('/register',protect,authorize('admin'), register);
router.post('/login', login);
router.get('/me',protect,authorize('admin'), getMyProfile);
router.put('/updatedetails',protect,authorize('admin'), updateDetails);
router.post('/forgotpassword', forgotPassword);

module.exports = router;