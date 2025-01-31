// app/api/submit-report/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendEmail } from '@/utils/sendEmail';

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

    //fs.writeFileSync(filePath, JSON.stringify(reports, null, 2));

    // Send email
    const emailSubject = 'New Violation Report Submitted';
    const emailText = `A new violation report has been submitted:\n\n${JSON.stringify(newReport, null, 2)}`;
    const emailHtml = `<p>A new violation report has been submitted:</p><pre>${JSON.stringify(newReport, null, 2)}</pre>`;

    await sendEmail(process.env.EMAIL_RECEIVER, emailSubject, emailText, emailHtml);

    return NextResponse.json({ message: 'Report submitted successfully' });
}