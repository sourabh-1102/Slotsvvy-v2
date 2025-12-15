import express from 'express';
import { PrismaClient } from '@prisma/client';
import { computeRoutes } from '../services/mlService';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/compute', async (req, res) => {
  const { date, pincode } = req.query; // or body
  // User prompt logic: POST /api/routes/compute?date=YYYY-MM-DD
  const dateStr = date as string || new Date().toISOString().split('T')[0];
  const pin = pincode as string || '110001'; // Default or from user

  // 1. Fetch parcels for that date/pincode
  // In reality, this would filter by scheduledDate
  const parcels = await prisma.parcel.findMany({
      where: {
          pincode: pin
          // deliveryDate roughly matches
      }
  });

  if (parcels.length === 0) {
      return res.json([]);
  }

  // 2. Call ML Service
  const routes = await computeRoutes(dateStr, pin, parcels);

  // 3. Save routes to DB (optional for MVP but good)
  // ...

  res.json(routes);
});

export default router;
