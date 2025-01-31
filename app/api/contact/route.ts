// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req: Request) {
    const body = await req.json();

    const newContact = {
        name: body.name,
        email: body.email,
        message: body.message,
        timestamp: new Date().toISOString(),
    };

    const emailSubject = 'New Contact Message Submitted';
    const emailText = `A new contact message has been submitted:\n\n${JSON.stringify(newContact, null, 2)}`;
    const emailHtml = `<p>A new contact message has been submitted:</p><pre>${JSON.stringify(newContact, null, 2)}</pre>`;

    try {
        await sendEmail(process.env.EMAIL_RECEIVER, emailSubject, emailText, emailHtml);

        return NextResponse.json({ message: 'Your message has been delivered successfully! We will contact you soon.' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send your message' }, { status: 500 });
    }
}
