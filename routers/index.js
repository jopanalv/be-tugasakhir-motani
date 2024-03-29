const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const { auth } = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/authController');
const { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { getAllUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { allCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { allBanners, createBanner, deleteBanner } = require('../controllers/bannerController');
const { createTransaction, acceptTransaction, cancelTransaction, completeTransaction, rejectTransaction, getTransaction, getAllTransaction, acceptGuarantee, acceptPaid } = require('../controllers/transactionController');
const { createReview, getAllReviewById } = require('../controllers/reviewController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/products', getAllProduct);
router.get('/products/:slug', getProduct);
router.post('/products', [auth(role.SELLER), upload.single('image')], createProduct);
router.put('/products/:slug', [auth(role.SELLER), upload.single('image')], updateProduct);
router.delete('/products/:slug', auth(role.SELLER), deleteProduct);

router.get('/users', auth(role.ADMIN), getAllUser);
router.get('/users/:id', getUser);
router.put('/users/:id', upload.single('image'), updateUser);
router.delete('/users/:id', auth(role.ADMIN), deleteUser);

router.get('/categories', allCategories);
router.post('/categories', auth(role.ADMIN), createCategory);
router.put('/categories/:id', auth(role.ADMIN), updateCategory);
router.delete('/categories/:id', auth(role.ADMIN), deleteCategory);

router.get('/banners', allBanners);
router.post('/banners', [auth(role.ADMIN), upload.single('image')], createBanner);
router.delete('/banners/:id', auth(role.ADMIN), deleteBanner);

router.get('/transactions', getAllTransaction);
router.get('/transaction/detail/:id', auth(role.SELLER), getTransaction);
router.post('/transaction/:slug', [auth(role.BUYER), upload.single('ktp')], createTransaction);
router.put('/transaction/accept/:id', auth(role.SELLER), acceptTransaction);
router.put('/transaction/cancel/:id', auth(role.BUYER), cancelTransaction);
router.put('/transaction/complete/:id', auth(role.SELLER), completeTransaction);
router.put('/transaction/reject/:id', auth(role.SELLER), rejectTransaction);
router.put('/transaction/guarantee/:id', auth(role.SELLER), acceptGuarantee);
router.put('/transaction/paid/:id', auth(role.SELLER), acceptPaid);

router.get('/review/:id', getAllReviewById);
router.post('/review', auth(role.BUYER), createReview);

module.exports = router;