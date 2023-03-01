const mongoose = require('mongoose');

const tagName = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const TagName = mongoose.model('tagname', tagName);
module.exports = TagName;