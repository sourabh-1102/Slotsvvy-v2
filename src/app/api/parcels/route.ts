import { NextResponse } from 'next/server';
import { mockDb } from '../../../lib/mockDb';

export async function GET() {
  const parcels = await mockDb.getAllParcels();
  return NextResponse.json(parcels);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simple validation
    if (!body.sender || !body.receiver || !body.pincode) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newParcel = await mockDb.createParcel(body);
    return NextResponse.json({ 
        success: true, 
        parcel: newParcel, 
        message: 'Parcel created successfully' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create parcel' }, { status: 500 });
  }
}
