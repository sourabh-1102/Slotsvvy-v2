import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Hardcoded check for MVP/Demo
        if (email === 'admin@slotsavvy.com' && password === 'admin') {
            const response = NextResponse.json({ success: true });
            
            // Set simple auth cookie
            // In production, use HttpOnly, Secure, SameSite=Strict, and a JWT/Session ID
            response.cookies.set('staff_token', 'valid-mock-token', {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24, // 1 day
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
