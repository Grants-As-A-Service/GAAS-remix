import { model, Schema } from "mongoose";

const Tag = new Schema({
    tagNameId: {
        type: Schema.Types.ObjectId,
        ref: "tagname",
        required: true,
    },
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

export const TagModel = model("tag", Tag);
