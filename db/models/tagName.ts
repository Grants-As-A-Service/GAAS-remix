import mongoose from "mongoose";

const TagNameSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

export const TagNameModel = mongoose.models?.TagName || mongoose.model("TagName", TagNameSchema);
