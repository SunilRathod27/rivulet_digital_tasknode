const { onUserSignIn, onUserLogin, onGetUser } = require('../controllers/userCon');
const {verifyToken} = require('../middleware/verify-token');

const router = require('express').Router();

router.post('/auth/signin', onUserSignIn);

router.post('/auth/login', onUserLogin);

router.get('/auth/user', verifyToken, onGetUser);

// router.patch('/auth/user');

module.exports = router;