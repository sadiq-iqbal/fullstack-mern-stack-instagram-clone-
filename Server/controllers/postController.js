const joi = require('joi');
const Post = require('../model/posts');
const mongoose = require('mongoose');
const postController = {

    async getPosts(req, res, next) {
        try {
            const posts = await Post.find().sort({ timestamp: -1 });
            if (!posts) {
                return next(error);
            }
            res.status(200).json({ message: "Posts fetched successfully", posts });
        } catch (error) {
            return next(error);
        }
    },

    async createPost(req, res, next) {
        const { caption, mediaUrl } = req.body;

        const postSchema = joi.object({
            caption: joi.string().required(),
            mediaUrl: joi.string()
        });


        const { error } = postSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        try {
            const myPost = await Post.create({
                caption,
                mediaUrl,
                userRef: req.user_Id
            });
            if (!Post) {
                return next(error);
            }
            res.status(201).json(Post);
        } catch (error) {
            return next(error);
        }
    },

    async deletePost(req, res, next) {
        const id = req.params.id;

        try {
            const postToDelete = await Post.findOne({ _id: id });
            if (!postToDelete) {
                return res.status(404).json({ message: 'Post not found' });
            }
            if (postToDelete.userRef.toString() != req.user_Id.toString()) {
                return res.status(403).json({ message: 'You are not authorized to delete this post' });
            }
            await Post.deleteOne({ _id: id });
            res.status(200).json({ message: 'Post deleted successfully' });
        }
        catch (error) {
            return next(error);
        }

    },

    async updatePost(req, res, next) {
        const id = req.params.id;
        const { caption, mediaUrl } = req.body;

        const postSchema = joi.object({
            caption: joi.string().optional(),
            mediaUrl: joi.string().optional()
        });

        const { error } = postSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        try {
            console.log(req.user_Id, caption, mediaUrl);
            const updatePost = await Post.findOneAndUpdate({ _id: id, userRef: req.user_Id }, { caption, mediaUrl }, { new: true });
            console.log(updatePost);
            if (!updatePost) {
                return res.status(404).json({ message: 'update failed' });
            }
            res.status(200).json({ message: 'Post updated successfully', data: updatePost });
        } catch (error) {
            return next(error);
        }

    },

    async getPostsbyId(req, res, next) {
        const userId = req.params.userId;
        try {
            const posts = await Post.find({ userRef: userId }).sort({ timestamp: -1 });
            if (!posts) {
                const error = {
                    status: 404,
                    message: 'Posts not found'
                }
                return next(error);
            }
            res.status(200).json({ message: "Posts fetched successfully", data: posts });
        }
        catch (error) {
            next(error)
        }
    },

    async getPostbyId(req, res, next) {
        const postId = req.params.postId;
        try {
            const posts = await Post.find({ _id: postId }).sort({ timestamp: -1 });
            if (!posts) {
                const error = {
                    status: 404,
                    message: 'Posts not found'
                }
            }
            res.status(200).json({ message: "Posts fetched successfully", data: posts });
        }
        catch (error) {
            next(error)
        }
    },

    async likePost(req, res, next) {
        const postId = req.params.postId;
        try {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            if (post.likes.includes(req.user_Id)) {
                post.likes = post.likes.filter(like => like.toString != req.user_Id.toString());
                await post.save();
                return res.status(200).json({ message: 'Post unliked successfully', isliked: false });
            }
            post.likes.push(req.user_Id);
            await post.save();
            res.status(200).json({ message: ' Post liked successfully', isliked: true });

        } catch (error) {
            return next(error);
        }
    },
    async getLikes(req, res, next) {
        const postId = req.params.postId;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid Post ID format' });
        }
        console.log(postId);
        try {
            const post = await Post.findById(postId);
            console.log(post);
            if (!post) {
                const error = {
                    status: 404,
                    message: 'Posts not found'
                }
                next(error);
            }
            const totalLikes = post.likes.length;
            res.status(200).json({ message: "Likes fetched successfully", data: post.likes, totalLikes });
        }
        catch (error) {
            next(error);

        }
    }

}

module.exports = postController