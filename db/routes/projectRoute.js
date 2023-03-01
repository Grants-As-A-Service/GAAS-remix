const express = require('express');
const { getProjects, createProject } = require('../controllers/projectController.js');

const router = express.Router()

router.get('/getAll', getProjects);
router.post('/create', createProject);

module.exports = router;