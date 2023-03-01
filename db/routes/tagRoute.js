const express = require('express');
const { getTags, createTag } = require('../controllers/tagController.js');

const router = express.Router()

router.get('/getAll', getTags);
router.get('/create', createTag);

module.exports = router;