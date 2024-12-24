// filepath: /home/bass3fas/bayan-website/bayan-web/app/api/submit-report/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    const filePath = path.join(process.cwd(), 'constants', 'reports.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const reports = JSON.parse(fileContents);

    const body = await req.json();

    const newReport = {
        id: reports.length + 1,
        name: body.name,
        email: body.email,
        message: body.message,
        file: body.file,
        anonymous: body.anonymous,
        timestamp: new Date().toISOString(),
    };

    reports.push(newReport);

    fs.writeFileSync(filePath, JSON.stringify(reports, null, 2));

    return NextResponse.json({ message: 'Report submitted successfully' });
}