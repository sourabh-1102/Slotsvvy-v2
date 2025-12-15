import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import parcelRoutes from './routes/parcels';
import slotRoutes from './routes/slots';
import routeRoutes from './routes/routes';
import trackingRoutes from './routes/tracking';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/parcels', parcelRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/tracking', trackingRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Export for Vercel
export default app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
