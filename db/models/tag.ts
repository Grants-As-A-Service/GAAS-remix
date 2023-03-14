import { model, Schema } from "mongoose";

const Tag = new Schema({
    tagName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantifier: {
        type: Number,
        require: true,
        min: 0,
        max: 10,
    },
});

export const TagModel = model("Tag", Tag);
