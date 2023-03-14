import mongoose from "mongoose";

export const BusinessSchema = new mongoose.Schema({
	accountId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Account",
		required: true,
	},
	name: {
		type: String,
		unique: true,
	},
	phone: String,
	address: String,
	city: String,
	province: String,
	postalCode: String,
	industry: String,
	fte: Number,
	pte: Number,
	annualRevenue: Number,
	yearOfInception: {
		type: Date,
		required: true,
	},
	projects: [String],
});

export const BusinessModel = mongoose.models.Business || mongoose.model("Business", BusinessSchema);
