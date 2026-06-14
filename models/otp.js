import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },

  otp: {
    type: String,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    },
    attempts: {
    type: Number,
    default: 0,
    },
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;