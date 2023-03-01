const Project = require("../models/project.js");

const getProjects = async (req,res) => {
    console.log('Server: {GET} /project/getAll endpoint called');
    try {
        const projects = await Project.find();
        
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createProject = async (req,res) => {
    console.log('Server: {POST} /project/create endpoint called');
    try {
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            capex: req.body.capex,
            annualOpex: req.body.annualOpex,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            tags: req.body.impactTags
        })
        const result = await project.save();
        
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {getProjects, createProject};