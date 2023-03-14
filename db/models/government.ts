import mongoose from "mongoose";

export const GovernmentSchema = new mongoose.Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    name: String,
    level: String,
    govDetails: String,
    email: String,
    annualFundingBudget: Number,
    fundedProjects: Number
});

export const GovernmentModel = mongoose.models.Government || mongoose.model("Government", GovernmentSchema);