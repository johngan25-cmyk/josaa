import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ZipArchive } from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const sendCutoff = async (req, res) => {
    try {
        const { year } = req.params; 

        if (!year) {
            return res.status(400).json({ success: false, message: "Year parameter is required." });
        }

        // Build the absolute path to your year directory safely
        const folderPath = path.resolve(__dirname, `../cutoff_data/${year}`);

        if (!fs.existsSync(folderPath)) {
            return res.status(404).json({ 
                success: false, 
                message: `Data directory for the year ${year} was not found on the server.` 
            });
        }

        // 1. Set the download headers for the client device
        res.setHeader('Content-Disposition', `attachment; filename="${year}_all_files.zip"`);
        res.setHeader('Content-Type', 'application/zip');

        // 2. Initialize your ZipArchive engine
        const archive = new ZipArchive();

        // Handle streaming errors safely
        archive.on('error', (err) => {
            console.error('Archive processing error:', err);
            if (!res.headersSent) {
                res.status(500).json({ success: false, message: "Error compiling the zip package." });
            }
        });

        // 3. Instead of a file, pipe the archive directly into Express's 'res' network pipe!
        archive.pipe(res);

        // 4. Read the 2026 folder and append each file to the archive
        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            const absoluteFilePath = path.join(folderPath, file);
            
            if (fs.statSync(absoluteFilePath).isFile()) {
                // Read the file data buffer
                const fileData = fs.readFileSync(absoluteFilePath);
                
                // Append it directly to the root level of your zip download
                archive.append(fileData, { name: file });
            }
        }

        // 5. Finalize the stream to complete the response
        await archive.finalize();

    } catch (error) {
        console.error("Controller Error:", error);
        if (!res.headersSent) {
            res.status(500).json({ 
                success: false, 
                message: "Internal server error while retrieving data." 
            });
        }
    }
};