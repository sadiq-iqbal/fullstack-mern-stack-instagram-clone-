const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true
    },
    userRef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;