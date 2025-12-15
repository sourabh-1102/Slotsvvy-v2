import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Users
  const sender = await prisma.user.upsert({
    where: { email: 'sender@example.com' },
    update: {},
    create: {
      email: 'sender@example.com',
      password: 'hashed_password_placeholder', // fast stub
      role: 'SENDER',
      name: 'Alice Sender',
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      email: 'staff@example.com',
      password: 'hashed_password_placeholder',
      role: 'STAFF',
      name: 'Bob Staff',
    },
  });

  console.log({ sender, staff });

  // Load Seed CSV if exists
  const seedCsvPath = path.join(__dirname, '../../../seed/delivery_history.csv');
  if (fs.existsSync(seedCsvPath)) {
     // This logic would be for loading historical data into a separate training table if needed,
     // or just validating the CSV exists. 
     // For the core DB, we might want some initial Parcels.
     console.log('Found seed CSV at', seedCsvPath);
  }

  // Create some initial slots for testing
  const today = new Date();
  today.setHours(9, 0, 0, 0);
  
  const slots = [];
  for(let i=0; i<3; i++) {
      const start = new Date(today);
      start.setHours(9 + (i*3));
      const end = new Date(start);
      end.setHours(start.getHours() + 3);
      
      const slotId = `slot-${start.toISOString()}`;
      slots.push({
          id: slotId,
          startTime: start,
          endTime: end,
          capacity: 10
      });
  }
  
  for (const s of slots) {
      await prisma.slot.upsert({
          where: { id: s.id },
          update: {},
          create: s
      });
  }
  
  console.log('Seeded slots.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
