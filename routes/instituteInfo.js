import express from "express";
import {
  downloadInstituteInfo,
  getInstituteInfo,
} from "../controllers/instituteInfoController.js";

const router = express.Router();

router.post("/institute-info", getInstituteInfo);
router.get("/institute-info/download", downloadInstituteInfo);

export default router;
