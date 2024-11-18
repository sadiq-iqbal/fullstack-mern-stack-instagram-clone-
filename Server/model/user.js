const { required } = require('joi');
const mongoose = require('mongoose');
// const { refresh } = require('../controllers/authController');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        maxlength: 150,
        default: ""
    },
    website: {
        type: String,
        maxlength: 100,
        default: ""
    },
    phone: {
        type: String,
        default: "",
        match: /^[0-9]{10,15}$/ // Optional phone format validation
    },
    profileImage: {
        type: String, // URL to the profile picture
        default: "default-profile.jpg" // Placeholder image
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: []
    },

    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: []
    },

    isPrivate: {
        type: Boolean,
        default: false
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;