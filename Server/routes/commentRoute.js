const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');
const verifyJwt = require('../middleware/verifyJwt.js');

router.get('/:postId/:commentId', commentController.getComments);
router.post('/:postId', verifyJwt, commentController.createComment);
router.delete('/:postId/:commentId', verifyJwt, commentController.deleteComment);
router.put('/:postId/:commentId', verifyJwt, commentController.updateComment);

module.exports = router;