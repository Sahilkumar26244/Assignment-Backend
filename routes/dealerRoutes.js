const express = require('express');
const { dealerRegister, dealerLogin } = require('../controllers/dealerController');

const router = express.Router();

router.route("/").post(dealerRegister);
router.route("/login").post(dealerLogin);

module.exports = router