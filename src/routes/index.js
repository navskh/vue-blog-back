const express = require('express');
const Treasure = require('./treasure.js');
const router = express.Router();

router.use('/treasure', Treasure);

module.exports = router;
