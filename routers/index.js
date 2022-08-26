const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const { auth } = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/authController');
const { createProduct } = require('../controllers/productController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.post('/products', [auth(role.SELLER), upload.single('image')], createProduct);

module.exports = router;