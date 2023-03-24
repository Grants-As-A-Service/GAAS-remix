import mongoose from "mongoose";

const GrantSchema = new mongoose.Schema({
	title: String,
	description: String,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Account",
		required: true,
	},
	tags: [String],
	createdAt: {
		type: Date,
		default: new Date(),
	},
	value: {
		type: mongoose.Schema.Types.Number,
		default: 10000,
	}
});

export const GrantModel = mongoose.models?.Grant || mongoose.model("Grant", GrantSchema);
