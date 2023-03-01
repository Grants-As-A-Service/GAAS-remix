const express = require('express');
const { getAccount, createAccount } = require('../controllers/accountController.js');

const router = express.Router()

router.get('/', getAccount);
router.post('/create', createAccount);

module.exports = router;