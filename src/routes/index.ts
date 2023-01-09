const expressR = require('express');
const Treasure = require('./treasure.ts');
export const router = expressR.Router();

router.use('/treasure', Treasure);