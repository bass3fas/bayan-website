// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const filePath = path.join(process.cwd(), 'constants', 'contacts.json');

    // Read existing contacts
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const contacts = JSON.parse(fileContents);

    const body = await req.json();

    const newContact = {
        name: body.name,
        email: body.email,
        message: body.message,
        timestamp: new Date().toISOString(),
    };

    // Add the new contact to the list
    contacts.push(newContact);

    // Save the updated contacts list
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    return NextResponse.json({ message: 'Your message has been delivered successfully!, we will contact you soon' });
}
