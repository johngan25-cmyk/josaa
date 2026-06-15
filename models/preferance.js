import mongoose from "mongoose";

const userPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    preferenceIndex: {
      type: Number,
      required: true,
      min: 1,
    },

    instituteName: {
      type: String,
      required: true,
      trim: true,
    },

    branchName: {
      type: String,
      required: true,
      trim: true,
    },

    closingRank2024: {
      type: Number,
      min: 1,
    },

    closingRank2025: {
      type: Number,
      min: 1,
    },
    skipped: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

userPreferenceSchema.index({
  userId: 1,
  preferenceIndex: 1,
});

const UserPreference = mongoose.model(
  "UserPreference",
  userPreferenceSchema
);

export default UserPreference;