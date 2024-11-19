const express = require('express');
const app = express();
const router = express.Router();
const postController = require('../controllers/postController.js')
const verifyJwt = require('../middleware/verifyJwt.js');

router.get('/posts/feed', postController.getPosts);
router.get('/posts/:userId', postController.getPostsbyId);
router.get('/posts/post/:postId', postController.getPostsbyId);
router.post('/posts', verifyJwt, postController.createPost);
router.put('/posts/:id', verifyJwt, postController.updatePost);
router.delete('/posts/:id', verifyJwt, postController.deletePost);
router.post('/posts/like/:postId', verifyJwt, postController.likePost);
module.exports = router;
