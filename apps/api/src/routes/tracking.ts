import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:parcelId', async (req, res) => {
  const { parcelId } = req.params;
  const parcel = await prisma.parcel.findUnique({
    where: { id: parcelId },
    include: { chosenSlot: true, route: true }
  });

  if (!parcel) {
    return res.status(404).json({ error: 'Parcel not found' });
  }

  res.json(parcel);
});

export default router;
