import mongoose from "mongoose";

export const AccountSchema = new mongoose.Schema({
    user: {
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
    },
    buisness: {
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
    },
});

export const AccountModel = mongoose.models.Account || mongoose.model("Account", AccountSchema);
