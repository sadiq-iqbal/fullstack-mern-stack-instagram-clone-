const express = require('express');
const app = express();
const router = express.Router();
const postController = require('../controllers/postController.js')
const verifyJwt = require('../middleware/verifyJwt.js');

router.get('/posts', postController.getPosts);
router.post('/post', verifyJwt, postController.createPost);
router.delete('/post/:id', verifyJwt, postController.deletePost);
router.put('/post/:id', verifyJwt, postController.updatePost);

module.exports = router;
