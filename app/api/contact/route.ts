// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req: Request) {
    const body = await req.json();

    const newContact = {
        name: body.name,
        email: body.email,
        message: body.message,
        file: body.file, // Include the file link
        timestamp: new Date().toLocaleString(), // human-readable
    };

    const emailSubject = '📩 New Contact Message Submitted';

    // Plain text email (for clients that don’t render HTML)
    const emailText = `
New contact form submission:

Name: ${newContact.name}
Email: ${newContact.email}

Message:
${newContact.message}

File: ${newContact.file ? newContact.file : 'No file uploaded'}
Submitted At: ${newContact.timestamp}
    `;

    // HTML email (nicely formatted)
    const emailHtml = `
    <h2>📩 New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${newContact.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${newContact.email}">${newContact.email}</a></p>
    <p><strong>Message:</strong></p>
    <div style="padding:10px; border-left:3px solid #ccc; background:#f9f9f9; white-space:pre-line;">
        ${newContact.message}
    </div>
    <p><strong>File:</strong> ${
        newContact.file
            ? `<a href="${newContact.file}" target="_blank">Download File</a>`
            : 'No file uploaded'
    }</p>
    <p><strong>Submitted At:</strong> ${newContact.timestamp}</p>
    `;

    try {
        await sendEmail(
            process.env.EMAIL_RECEIVER,
            emailSubject,
            emailText,
            emailHtml
        );

        return NextResponse.json({
            message:
                'Your message has been delivered successfully! We will contact you soon.',
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send your message' },
            { status: 500 }
        );
    }
}