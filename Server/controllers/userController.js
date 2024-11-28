const User = require("../model/user");

const userController = {
    async getAllUsers(req, res) { },
    async getMyProfile(req, res) { },
    async getUserById(req, res) { },
    async updateMyProfile(req, res) { },
    async followUser(req, res, next) {
        const userId = req.params.id; // The user to follow
        const myId = req.user_Id;    // The current logged-in user

        // Check for required userId
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Prevent self-following
        if (userId === myId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        try {
            // Find the user to follow
            const userToFollow = await User.findById(userId);
            if (!userToFollow) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the current user is already following
            if (userToFollow.followers.includes(myId)) {
                return res.status(400).json({ message: "You are already following this user" });
            }

            // Add the follower to the user's followers list
            userToFollow.followers.push(myId);
            await userToFollow.save();

            // Add the user being followed to the current user's following list
            const myProfile = await User.findById(myId);
            if (!myProfile.following.includes(userId)) {
                myProfile.following.push(userId);
                await myProfile.save();
            }

            return res.status(200).json({ message: "User followed successfully" });

        } catch (error) {
            // Handle unexpected errors
            console.error("Error in followUser:", error);
            return next(error);
        }
    },

    async unfollowUser(req, res) {
        const userId = req.params.id; // The user to unfollow
        const myId = req.user_Id;    // The current logged-in user

        try {
            const userToUnfollow = await User.findById(userId);
            if (!userToUnfollow) {
                return res.status(404).json({ message: "User not found" });
            }

            if (!userToUnfollow.followers.includes(myId)) {
                return res.status(400).json({ message: "You are not following this user" });
            }

            // Remove the follower from the user's followers list
            userToUnfollow.followers.pull(myId);
            await userToUnfollow.save();

            // Remove the user being unfollowed from the current user's following list
            const myProfile = await User.findById(myId);
            if (myProfile.following.includes(userId)) {
                myProfile.following.pull(userId);
                await myProfile.save();
            }

            return res.status(200).json({ message: "User unfollowed successfully" });

        } catch (error) {
            return next(error)
        }
    }
}