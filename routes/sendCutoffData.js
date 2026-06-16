import express from 'express';
import { sendCutoff } from '../controllers/sendCutoffController.js';
const router=express.Router();
router.get('/sendCutoffs/:year',sendCutoff);
export default router;