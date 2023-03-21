import mongoose from "mongoose";

const GrantProjectSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        require: true,
    },
    grantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grant",
        require: true
    }
});

GrantProjectSchema.index({projectId: 1, grantId: 1}, {unique: true});

export const GrantProjectModel = mongoose.models?.GrantProject || mongoose.model("GrantProject", GrantProjectSchema);