import { Schema, model } from "mongoose";

const Project = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    capex: {
        type: Number,
        require: true,
    },
    annualOpex: {
        type: Number,
        require: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    tags: [
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            strength: {
                type: String,
                required: true,
            },
        },
    ],
});

export const ProjectModel = model("project", Project);
