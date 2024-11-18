const mongoose = require('mongoose');
const { Schema } = mongoose;
const postSchema = new Schema({
    userRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    caption: { type: String, maxlength: 500, required: true },
    mediaUrl: { type: String, required: true, default: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        userRef: { type: Schema.Types.ObjectId, ref: 'User' },
        text: String,
        timestamp: { type: Date, default: Date.now }
    }],
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', postSchema);
