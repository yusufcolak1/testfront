const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const { authenticate, optionalAuthenticate } = require('../middlewares/auth');

router.post('/support/request', optionalAuthenticate, supportController.createSupportRequest);

module.exports = router;
