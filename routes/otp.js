import express from "express";
import {
  sendOtp,
  verifyOtp,
} from "../controllers/otpController.js";

const router = express.Router();

router.post("/otp/send-otp", sendOtp);
router.post("/otp/verify-otp", verifyOtp);

export default router;