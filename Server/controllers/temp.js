const User = require('../model/user');

const userController = {
    async getAllUsers(req, res) {
        // Your implementation
    },
    async getMyProfile(req, res) {
        // Your implementation
    },
    async getUserById(req, res, next) {
        const userId = req.params.id;
        if (!userId) {
            const error = {
                status: 400,
                message: "User ID is required",
            };
            return next(error);
        }
        try {
            const user = await User.findById(userId);
            if (!user) {
                const error = {
                    status: 404,
                    message: "User not found",
                };
                return next(error);
            }
            res.status(200).json({ message: "User fetched successfully", data: user });
        } catch (error) {
            next(error);
        }
    },
    async updateMyProfile(req, res) {
        // Your implementation
    },
    async followUser(req, res, next) {
        // Your implementation (shared above)
    },
    async unfollowUser(req, res, next) {
        // Your implementation (shared above)
    },
};

module.exports = userController;
