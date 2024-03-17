const { oncreateProduct, onGetProductList, onGetSingleProduct, onUpdateProduct, onDeleteProduct } = require('../controllers/productCon');
const upload = require('../middleware/upload-photo');
const { verifyToken } = require('../middleware/verify-token');

const router = require('express').Router();

router.post('/product', verifyToken, onGetProductList);

router.post('/product', verifyToken, upload, oncreateProduct);

router.get('/product/:id', verifyToken, onGetSingleProduct);

router.patch('/product/:id', verifyToken, upload, onUpdateProduct);

router.delete('/product/:id', verifyToken, onDeleteProduct);

module.exports = router;