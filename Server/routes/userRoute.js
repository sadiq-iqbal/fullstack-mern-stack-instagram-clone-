const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/myProfile', userController.getMyProfile);
router.put('/users/myProfile', userController.updateMyProfile);
router.post("/users/:id/follow", userController.followUser);
router.post("/users/:id/unfollow", userController.unfollowUser);
modules.exports = router;   