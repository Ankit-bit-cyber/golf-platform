import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5005; // Different port
const logFile = path.join(__dirname, '../../minimal-test.log');

app.get('/', (req, res) => res.json({ alive: true }));

try {
    app.listen(PORT, () => {
        const msg = `[MINIMAL SUCCESS] ${new Date().toISOString()} Minimal server on port ${PORT}\n`;
        fs.appendFileSync(logFile, msg);
        console.log(msg);
    });
} catch (err: any) {
    const msg = `[MINIMAL FAIL] ${new Date().toISOString()} ${err.message}\n`;
    fs.appendFileSync(logFile, msg);
    console.error(msg);
}
