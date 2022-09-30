import express from 'express';
import Treasure from './treasure.js';
const router = express.Router();

router.use('/treasure', Treasure);

export default router;
