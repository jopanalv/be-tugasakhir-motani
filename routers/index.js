const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const { auth } = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/authController');
const { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/products', getAllProduct);
router.get('/products/:id', getProduct);
router.post('/products', [auth(role.SELLER), upload.single('image')], createProduct);
router.put('/products/:id', [auth(role.SELLER), upload.single('image')], updateProduct);
router.delete('/products/:id', auth(role.SELLER), deleteProduct);

module.exports = router;