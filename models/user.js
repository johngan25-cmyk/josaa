import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    mainsRank: {
      type: Number,
      required: true,
      min: 1,
    },

    advancedRank: {
      type: Number,
      required: true,
      min: 1,
    },

    category: {
      type: String,
      required: true,
      enum: ["open", "ews", "obc-ncl", "sc", "st"],
    },

    gender: {
      type: String,
      required: true,
      enum: ["gender-nutral", "female-only"],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;