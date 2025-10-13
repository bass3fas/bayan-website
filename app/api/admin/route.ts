import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const adminUsername = process.env.ADMIN_USERNAME ;
    const adminPassword = process.env.ADMIN_PASSWORD ;

    if (username === adminUsername && password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (err) { // Use err instead of error
    console.error('Login API error:', err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}