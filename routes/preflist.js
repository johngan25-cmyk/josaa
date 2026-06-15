import express from "express";
import { protect } from "../middleware/protect.js";
import { savePreferences , getPreferences } from "../controllers/preferance.js";
const router = express.Router();

router.post('/savePref',protect,savePreferences);
router.get('/getPref',protect,getPreferences);

export default router;