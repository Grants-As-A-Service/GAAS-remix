import mongoose from "mongoose";

const Tag = new mongoose.Schema({
	tagNameId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TagName",
		required: true,
	},
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
		required: true,
	},
	name: {
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

export const TagModel = mongoose.models.Tag || mongoose.model("Tag", Tag);
