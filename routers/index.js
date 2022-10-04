const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const { auth } = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/authController');
const { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { getAllUser, getUser, updateUser, deleteUser } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/products', getAllProduct);
router.get('/products/:id', getProduct);
router.post('/products', [auth(role.SELLER), upload.single('image')], createProduct);
router.put('/products/:id', [auth(role.SELLER), upload.single('image')], updateProduct);
router.delete('/products/:id', auth(role.SELLER), deleteProduct);

router.get('/users', auth(role.ADMIN), getAllUser);
router.get('/users/:id', getUser);
router.put('/users/:id', upload.single('image'), updateUser);
router.delete('/users/:id', auth(role.ADMIN), deleteUser);

module.exports = router;