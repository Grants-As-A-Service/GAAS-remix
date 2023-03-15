import mongoose from "mongoose";

const Project = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Account",
	},
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
});

export const ProjectModel = mongoose.models.Account || mongoose.model("project", Project);
