const Account = require("../models/account.js");

const getAccount = async (req,res) => {
    try {
        const account = await Account.findOne();
        res.status(200).json(account);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createAccount = async (req,res) => {
    try {
        const account = new Account({
            user: {
                name: req.body.user.name,
                phone: req.body.user.phone,
                email: req.body.user.email
            },
            business: {
                name: req.body.business.name,
                phone: req.body.business.phone,
                address: req.body.business.address,
                city: req.body.business.city,
                province: req.body.business.province,
                postalCode: req.body.business.postalCode,
                industry: req.body.business.industry,
                fte: req.body.business.fte,
                pte: req.body.business.pte,
                annualRevenue: req.body.business.annualRevenue,
                yearOfInception: req.body.business.yearOfInception,
                projects: req.body.business.projects
            }
        })
        const result = await account.save();
        res.status(200).json(result);
        res.send();
    } catch (error) {
        res.status(404).json({message: error.message});
        res.send();
    }
}

module.exports = {getAccount, createAccount};