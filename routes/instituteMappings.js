import express from "express";
import { getInstituteMappings } from "../controllers/instituteMappingsController.js";

const router = express.Router();

router.get("/institute-mappings", getInstituteMappings);

export default router;
