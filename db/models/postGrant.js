const mongoose = require('mongoose');

const grantSchema = mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    tags: [String],
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const GrantPost = mongoose.model('GrantPost', grantSchema);
module.exports = GrantPost;