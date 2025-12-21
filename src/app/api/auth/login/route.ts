import { NextResponse } from 'next/server';
import { mockDb } from '../../../../lib/mockDb';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await mockDb.findUserByEmail(email);

    if (user) {
        // MOCK AUTH: Accepting any password for the correct email for simplicity in demo
        return NextResponse.json({ 
            success: true, 
            token: 'mock-jwt-token-123', 
            user 
        });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
