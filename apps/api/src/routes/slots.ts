import express from 'express';
import { getSlotRecommendations } from '../services/mlService';

const router = express.Router();

router.get('/recommend', async (req, res) => {
  const { pincode, date, weight } = req.query;
  
  if (!pincode || !date) {
    return res.status(400).json({ error: 'Missing pincode or date' });
  }

  const w = weight ? parseFloat(weight as string) : 1.0;
  
  const slots = await getSlotRecommendations(pincode as string, date as string, w);
  res.json(slots);
});

export default router;
