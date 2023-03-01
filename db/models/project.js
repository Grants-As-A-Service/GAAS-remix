const mongoose = require('mongoose');

const project = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    capex: {
        type: Number,
        require: true
    },
    annualOpex: {
        type: Number,
        require: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    tags: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            strength: {
                type: String,
                required: true
            },

        }
    ],
});

const Project = mongoose.model('project', project);
module.exports = Project;