const Tag = require("../models/tag.js");

const getTags = async (req,res) => {
    console.log('Server: {GET} /tag/getAll endpoint called');
    try {
        const tags = await Tag.find();
        
        res.status(200).json(tags);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createTag = async (req,res) => {
    console.log('Server: {POST} /tag/create endpoint called');
    try {
        const tag = new Tag({
            tagNameId: req.body.tagNameId,
            tagName: req.body.tagName,
            description: req.body.desc,
            quantifier: req.body.quantifier
        })
        const result = await tag.save();
        
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {getTags,createTag};