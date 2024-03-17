const { onGetSubCategoryList, onCreateSubCategory } = require('../controllers/subCategoryCon');
const { verifyToken } = require('../middleware/verify-token');

const router = require('express').Router();

router.get('/subcategory', verifyToken, onGetSubCategoryList);

router.post('/subcategory', verifyToken, onCreateSubCategory);

module.exports = router;