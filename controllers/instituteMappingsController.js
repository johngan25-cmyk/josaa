import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mappingPath = path.resolve(__dirname, "../instituteData/mapping_inst.json");
const mappingData = JSON.parse(fs.readFileSync(mappingPath, "utf8"));

export const getInstituteMappings = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        iits: mappingData.institutes.iits,
        nits: mappingData.institutes.nits,
        iiits: mappingData.institutes.iiits,
        gftis: mappingData.institutes.gftis,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
