const Comments = require("../model/comments.js");
const Joi = require('joi');
const Post = require("../model/posts.js");

const commentController = {
    getComments: async (req, res) => {
        const postId = req.params.postId;
        try {
            const comments = await Comments.find({ postRef: postId }).sort({ timestamp: -1 });
            res.status(200).json({ message: "Comments fetched successfully", data: comments });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createComment: async (req, res, next) => {
        const { postId } = req.params;
        const user_Id = req.user_Id;
        const { content } = req.body;

        // Validate the input
        const commentSchema = Joi.object({
            content: Joi.string().max(500).required(),
        });

        const { error } = commentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            // Verify the post exists
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Create the comment
            const createdComment = await Comments.create({
                userRef: user_Id,
                postRef: postId, // Add a reference to the post
                content,
            });

            // Push the comment into the post's comments array
            post.comments.push(createdComment._id);
            await post.save();

            // Respond with success
            res.status(201).json({
                message: 'Comment added successfully',
                comment: createdComment,
            });
        } catch (error) {
            next(error); // Pass errors to the error handler middleware
        }
    },


    deleteComment: async (req, res, next) => {
        const commentId = req.params.commentId;
        const postId = req.params.postId;
        const user_Id = req.user_Id;
        console.log(commentId, postId, user_Id);
        try {
            const comment = await Comments.findById(commentId);
            console.log(comment);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            if (comment.userRef.toString() !== user_Id || comment.postRef.toString() !== postId) {
                return res.status(403).json({
                    message: 'Unauthorized',
                    data:
                    {
                        userRef: comment.userRef.toString(),
                        postRef: comment.postRef.toString(),
                        user_Id,
                        postId
                    }
                });
            }
            console.log('passed through all the checks and we are finally set to go ')

            await Comments.findByIdAndDelete(commentId);

            await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            return next(error)
        }
    },

    updateComment: async (req, res, next) => {
        console.log('update comment route has justbeen hit');
        const { content } = req.body;
        const commentId = req.params.commentId;
        const postId = req.params.postId;
        const user_Id = req.user_Id;
        console.log(commentId, postId, user_Id);
        try {
            const commentToUpdate = await Comments.findById(commentId);
            console.log(commentToUpdate);
            if (!commentToUpdate) {
                const error = {
                    status: 404,
                    message: 'Comment not found'
                }
                return next(error)
            }

            if (commentToUpdate.userRef.toString() !== user_Id || commentToUpdate.postRef.toString() !== postId) {
                const error = {
                    status: 403,
                    message: 'Unauthorized',
                }
                return next(error)
            }

            commentToUpdate.content = content;
            await commentToUpdate.save();

            return res.status(200).json({ message: 'Comment updated successfully', data: commentToUpdate })

        } catch (error) {
            return next(error)
        }
    }
}

module.exports = commentController;