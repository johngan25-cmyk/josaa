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
        total_institutes: mappingData.total_institutes,
        iitSTL: mappingData.institutes.iits,
        nitSTL:mappingData.institutes.nits,
        iiitSTL:mappingData.institutes.iiits,
        gftisSTL:mappingData.institutes.gftis,
        iitLTS:mappingData.reverse_institutes.iits,
        nitLTS:mappingData.reverse_institutes.nits,
        iiitLTS:mappingData.reverse_institutes.iiits,
        gftiLTS:mappingData.reverse_institutes.gftis,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
