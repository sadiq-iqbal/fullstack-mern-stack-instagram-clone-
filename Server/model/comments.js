const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new Schema({
    userRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    postRef: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Comments', commentsSchema);