const express = require('express');
const app = express();
const router = express.Router();
const postController = require('../controllers/postController.js')
const verifyJwt = require('../middleware/verifyJwt.js');
try {

    router.post('/posts', verifyJwt, postController.createPost);
    router.get('/posts/feed', postController.getPosts);
    router.get('/posts/:userId', postController.getPostsbyId);
    router.get('/posts/post/:postId', postController.getPostbyId);
    router.get('/posts/:postId/likes', verifyJwt, postController.getLikes);
    router.post('/posts/like/:postId', verifyJwt, postController.likePost);
    router.put('/posts/:id', verifyJwt, postController.updatePost);
    router.delete('/posts/:id', verifyJwt, postController.deletePost);
} catch (error) {

    console.log(error.message, error.name);
}
module.exports = router;
