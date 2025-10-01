import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {               // ✅ unchanged
    const formData = await req.formData();      // ✅ unchanged
    const file = formData.get('file');          // ✅ unchanged

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // ✅ File type validation (only images & pdf)
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf'
    ];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
            { error: 'File type not supported. Only JPG, PNG, WEBP, GIF, and PDF are allowed.' },
            { status: 400 }
        );
    }

    try {
        const arrayBuffer = await file.arrayBuffer();  // ✅ unchanged
        const buffer = Buffer.from(arrayBuffer);       // ✅ unchanged

        const response = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { resource_type: 'auto', upload_preset: 'bayan_public_uploads', type: 'upload' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                )
                .end(buffer);
        });

        console.log('File uploaded successfully:', response.secure_url);
        return NextResponse.json({ link: response.secure_url }); // ✅ unchanged
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
