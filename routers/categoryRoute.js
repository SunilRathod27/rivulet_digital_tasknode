const { onGetCategoryList, onCreateCategory } = require('../controllers/categoryCon');
const { verifyToken } = require('../middleware/verify-token');

const router = require('express').Router();

router.get('/category', verifyToken, onGetCategoryList);

router.post('/category', verifyToken, onCreateCategory);

module.exports = router;