import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const infoPath = path.resolve(__dirname, "../instituteData/info.json");
const instituteData = JSON.parse(fs.readFileSync(infoPath, "utf8"));

const normalizeName = (name) => name.trim().toLowerCase();

const instituteByName = new Map();

for (const institutes of Object.values(instituteData)) {
  for (const institute of institutes) {
    instituteByName.set(normalizeName(institute.name), institute);
  }
}

export const getInstituteInfo = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Institute name is required",
      });
    }

    const institute = instituteByName.get(normalizeName(name));

    if (!institute) {
      return res.status(404).json({
        success: false,
        message: "Institute not found",
      });
    }

    res.status(200).json({
      success: true,
      data: institute,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const downloadInstituteInfo = async (req, res) => {
  try {
    res.download(infoPath, "info.json", (error) => {
      if (error && !res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Error downloading institute info",
        });
      }
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};
