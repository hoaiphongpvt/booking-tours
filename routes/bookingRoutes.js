const express = require('express');
const router = express.Router();

const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

router.get(
  '/checkout-session/:tourID/:userID',
  // authController.isLoggedIn,
  bookingController.getCheckOutSession,
);

module.exports = router;
