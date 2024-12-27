const express = require('express');
const userControllers = require('../controllers/userControllers');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);
router.patch('/updateMe', authController.protect, userControllers.updateMe);
router.delete('/deleteMe', authController.protect, userControllers.deleteMe);

router.route('/').get(userControllers.getAllUsers);
router.route('/me').get(authController.protect, userControllers.getMe);

module.exports = router;
