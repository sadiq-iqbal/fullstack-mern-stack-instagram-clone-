const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users/:id', userController.getUser);
router.get('/users/me', userController.getMyProfile);
router.put('/users/me', userController.updateMyProfile);

modules.exports = router;