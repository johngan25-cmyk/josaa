import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/create-user", async (req, res) => {
  try {
    const result = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;