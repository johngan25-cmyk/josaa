import UserPreference from "../models/preferance.js";

export const savePreferences = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { preferences } = req.body;

    if (!preferences || !Array.isArray(preferences)) {
      return res.status(400).json({
        success: false,
        message: "Preferences array is required",
      });
    }

    await UserPreference.deleteMany({
      userId,
    });

    const preferenceDocs = preferences.map((pref) => ({
      userId,

      preferenceIndex: pref.preferenceIndex,

      instituteName: pref.instituteName,

      branchName: pref.branchName,

      closingRank2024: pref.closingRank2024,

      closingRank2025: pref.closingRank2025,

      skipped: pref.skipped ?? false,
    }));

    await UserPreference.insertMany(
      preferenceDocs
    );

    res.json({
      success: true,
      count: preferenceDocs.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};