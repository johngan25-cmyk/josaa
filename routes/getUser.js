import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/get-user", async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;