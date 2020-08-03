const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth');

router.post('/login', asyncHandler(authController.signin));

module.exports = router;