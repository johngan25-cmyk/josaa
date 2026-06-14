import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Otp from "../models/otp.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);

    const existingOtp = await Otp.findOne({
      email: normalizedEmail,
    });

    if (existingOtp) {
      const secondsPassed =
        (Date.now() - existingOtp.createdAt.getTime()) / 1000;

      if (secondsPassed < 60) {
        return res.status(429).json({
          success: false,
          message: `Please wait ${Math.ceil(
            60 - secondsPassed
          )} seconds before requesting another OTP`,
        });
      }
    }

    await Otp.deleteMany({
      email: normalizedEmail,
    });

    await Otp.create({
      email: normalizedEmail,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your JoSAA Manager Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2>Verify Your Email</h2>

          <p>Your verification code is:</p>

          <div
            style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              padding: 15px;
              background: #f4f4f4;
              text-align: center;
              border-radius: 8px;
            "
          >
            ${otp}
          </div>

          <p style="margin-top:20px;">
            This code will expire in 5 minutes.
          </p>

          <p>
            If you didn't request this code, you can ignore this email.
          </p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "OTP sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP invalid or expired",
      });
    }

    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(400).json({
        success: false,
        message: "OTP invalid or expired",
      });
    }

    const isValidOtp = await bcrypt.compare(
      otp,
      otpRecord.otp
    );

    if (!isValidOtp) {
      otpRecord.attempts += 1;

      await otpRecord.save();

      return res.status(400).json({
        success: false,
        message: "OTP invalid or expired",
      });
    }

    await User.updateOne(
      { email: normalizedEmail },
      {
        $set: {
          isEmailVerified: true,
        },
      }
    );

    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    res.json({
      success: true,
      message: "Email verified",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};