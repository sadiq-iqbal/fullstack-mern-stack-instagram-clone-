const express = require("express");
const router = express.Router();


router.post("/follow/:id", followController.followUser);
router.post("/unfollow/:id", followController.unfollowUser);