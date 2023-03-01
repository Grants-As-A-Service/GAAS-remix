const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    user: {
        name: String,
        email: String,
        phone: String
    },
    business: {
        name: String,
        phone: String,
        address: String,
        city: String,
        province: String,
        postalCode: String,
        industry: String,
        fte: Number,
        pte: Number,
        annualRevenue: Number,
        yearOfInception: Number,
        projects: [String]
    } 
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;