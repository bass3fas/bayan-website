import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

// Disable bodyParser for formidable
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function POST(req, res) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    const reportsPath = path.join(process.cwd(), 'constants', 'reports.json');

    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const form = new formidable.IncomingForm({
        uploadDir,
        keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).json({ error: 'Error parsing form data' });
        }

        const { name, email, message, anonymous } = fields;
        const filePath = files.file ? `./uploads/${files.file.newFilename}` : null;

        try {
            // Read existing reports or initialize as an empty array
            const fileContents = fs.existsSync(reportsPath)
                ? fs.readFileSync(reportsPath, 'utf8')
                : '[]';
            const reports = JSON.parse(fileContents);

            // Create a new report
            const newReport = {
                id: reports.length + 1,
                name: anonymous === 'true' ? 'Anonymous' : name,
                email: anonymous === 'true' ? 'Anonymous' : email,
                message,
                file: filePath,
                date: new Date().toISOString(),
            };

            // Add the new report to the array
            reports.push(newReport);

            // Save updated reports to `constants/reports.json`
            fs.writeFileSync(reportsPath, JSON.stringify(reports, null, 2));

            return res.status(200).json({ message: 'Report submitted successfully', report: newReport });
        } catch (error) {
            console.error('Error saving report:', error);
            return res.status(500).json({ error: 'Error saving report' });
        }
    });
}
