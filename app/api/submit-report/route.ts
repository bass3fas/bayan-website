import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req: Request) {
    const body = await req.json();

    const newReport = {
        name: body.name,
        email: body.email,
        message: body.message,
        file: body.file,
        anonymous: body.anonymous,
        timestamp: new Date().toISOString(),
    };

    const emailSubject = 'New Violation Report Submitted';
    const emailText = `A new violation report has been submitted:\n\n${JSON.stringify(newReport, null, 2)}`;
    const emailHtml = `<p>A new violation report has been submitted:</p><pre>${JSON.stringify(newReport, null, 2)}</pre>`;

    try {
        await sendEmail(process.env.EMAIL_RECEIVER, emailSubject, emailText, emailHtml);

        return NextResponse.json({ message: 'Report submitted successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
    }
}