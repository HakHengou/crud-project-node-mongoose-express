const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const userController = require('../controllers/users');

router.post('/user', asyncHandler(userController.createUser));
router.get('/user', asyncHandler(userController.getUser));
router.get('/user/:id', asyncHandler(userController.getUserById));
router.patch('/user/:id', asyncHandler(userController.updateUser));
router.delete('/user/:id', asyncHandler(userController.deleteUser));


module.exports = router;