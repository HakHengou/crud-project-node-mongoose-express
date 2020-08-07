const router = require('express').Router();
const roleController = require('../controllers/roles');
const asynHandler = require('express-async-handler');

router.post('/role', asynHandler(roleController.createRole));
router.get('/role', asynHandler(roleController.getRole));
router.delete('/role/:id', asynHandler(roleController.deleteRole));
router.patch('/role/:id', asynHandler(roleController.updateRole));

module.exports = router;
