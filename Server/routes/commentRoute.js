const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');
const verifyJwt = require('../middleware/verifyJwt.js');

router.get('/:postId/:commentId', (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    res.send({ postId, commentId, message: 'Comment fetched successfully' });
});
router.post('/:postId', verifyJwt, commentController.createComment);
router.delete('/:postId/:commentId', verifyJwt, commentController.deleteComment);
router.put('/:postId/:commentId', verifyJwt, commentController.updateComment);

module.exports = router;