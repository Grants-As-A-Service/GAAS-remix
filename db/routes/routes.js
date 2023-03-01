const express = require('express');

const { getGrant , createGrant} = require('../controllers/grants.js');

const router = express.Router()

router.get('/', getGrant);
router.post('/',createGrant);

module.exports = router;