import mongoose from "mongoose";

export const AccountSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        index: true,
        unique: true,
    },
    phone: {
        type: String,
        index: true,
        unique: true,
    },
});

export const AccountModel = mongoose.models?.Account || mongoose.model("Account", AccountSchema);
