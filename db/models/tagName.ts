import { model, Schema } from "mongoose";

const TagNameSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

export const TagNameModel = model("tagname", TagNameSchema);
