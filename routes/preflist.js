import express from "express";
import { protect } from "../middleware/protect.js";
import { savePreferences } from "../controllers/preferance.js";
const router = express.Router();

router.post('/savePref',protect,savePreferences);


export default router;