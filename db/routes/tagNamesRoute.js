const express = require('express');
const { getTagNames, createTagName } = require('../controllers/tagNamesController.js');

const router = express.Router()

router.get('/getAll', getTagNames);
router.post('/create', createTagName);

module.exports = router;