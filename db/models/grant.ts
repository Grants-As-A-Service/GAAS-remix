import { model, Schema } from "mongoose";

const GrantSchema = new Schema({
	title: String,
	description: String,
	creator: String,
	tags: [String],
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export const GrantModel = model("GrantPost", GrantSchema);
