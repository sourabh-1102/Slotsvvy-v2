import express from 'express';
import { PrismaClient } from '@prisma/client';
import { sendEmail, sendSMS } from '../services/notificationService';

const router = express.Router();
const prisma = new PrismaClient();

// Create Parcel
router.post('/', async (req, res) => {
  try {
    const { pincode, weight, senderId } = req.body;
    
    // Validate sender exists (mock or real)
    // For MVP, if senderId is not provided, use default
    let effectiveSenderId = senderId;
    if (!effectiveSenderId) {
        // Find first sender
        const sender = await prisma.user.findFirst({ where: { role: 'SENDER' } });
        if (sender) effectiveSenderId = sender.id;
    }

    const parcel = await prisma.parcel.create({
      data: {
        pincode,
        weight: parseFloat(weight),
        sender: { connect: { id: effectiveSenderId } }
      },
      include: { sender: true }
    });
    
    // Send Notification
    const senderEmail = parcel.sender?.email || 'test@example.com';
    await sendEmail(senderEmail, 'Parcel Created', `Your parcel ${parcel.id} has been created.`);
    await sendSMS('+15550000000', `SlotSavvy: Parcel ${parcel.id} booked.`);
    
    res.json(parcel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create parcel' });
  }
});

// List Parcels (for staff/sender)
router.get('/', async (req, res) => {
  const parcels = await prisma.parcel.findMany();
  res.json(parcels);
});

export default router;
