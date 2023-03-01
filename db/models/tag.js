const mongoose = require('mongoose');

const tag = mongoose.Schema({
    tagNameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tagname',
        required: true,
    },
    tagName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantifier: {
        type: Number,
        require: true,
        min: 0,
        max: 10
    }
});

const Tag = mongoose.model('tag', tag);
module.exports = Tag;