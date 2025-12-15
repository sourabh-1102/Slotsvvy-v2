import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Parcel from '../../../models/Parcel';

// ---------------------------------------------------------
// Notification System (Stub)
// ---------------------------------------------------------
const sendNotification = async (type: 'email' | 'whatsapp', to: string, message: string) => {
    console.log(`[NOTIFICATION SYSTEM] Sending ${type} to ${to}: "${message}"`);
    return true;
};

// ---------------------------------------------------------
// API Handlers
// ---------------------------------------------------------

export async function GET() {
    try {
        await dbConnect();
        // Fetch all parcels, sort by creation time desc
        const parcels = await Parcel.find({}).sort({ createdAt: -1 });
        return NextResponse.json(parcels);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to fetch parcels' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { senderName, recipientName, recipientAddress, recipientPhone, weight, slot, pincode, senderAddress } = body;

        // 1. Validation
        if (!recipientName || !recipientAddress) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate Custom ID (Simple Counter simulation for MVP)
        // In prod, use UUID or atomic counter. Here using timestamp suffix related.
        const count = await Parcel.countDocuments();
        const newId = `TRK-2023-${(count + 1).toString().padStart(3, '0')}`;

        // 2. Add to Database
        const newParcel = await Parcel.create({
            id: newId,
            sender: senderName,
            senderAddress: senderAddress,
            receiver: recipientName,
            address: recipientAddress,
            phone: recipientPhone,
            weight: weight,
            pincode: pincode || '110001',
            slot: slot || 'Unassigned',
            status: 'SCHEDULED',
            driverId: null
        });

        // 3. Trigger Notifications
        await sendNotification('email', recipientName, `Your parcel from ${senderName} has been booked! Tracking ID: ${newParcel.id}. Slot: ${newParcel.slot}`);
        
        if (recipientPhone) {
            await sendNotification('whatsapp', recipientPhone, `SlotSavvy: Your shipment ${newParcel.id} is confirmed for ${newParcel.slot}. Track at /receiver`);
        }

        return NextResponse.json({ 
            success: true, 
            parcel: newParcel, 
            message: 'Parcel booked and notifications sent.' 
        });

    } catch (error: any) {
        console.error('Booking Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
