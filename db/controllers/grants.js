const GrantPost = require("../models/postGrant.js");

const getGrant = async (req,res) => {
    try {
        const grantMessages = await GrantPost.find();
        
        res.status(200).json(grantMessages);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createGrant = async(req, res) => {
    const post = req.body;
    const newGrant = new GrantPost(post);
    try {
        await newGrant.save();
        res.status(201).json(newGrant);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

module.exports = {getGrant, createGrant};
