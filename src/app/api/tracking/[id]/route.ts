import { NextResponse } from 'next/server';
import { mockDb } from '../../../../lib/mockDb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parcel = await mockDb.getParcelByTrackingId(id);

  if (!parcel) {
    return NextResponse.json({ error: 'Parcel not found' }, { status: 404 });
  }

  return NextResponse.json(parcel);
}
