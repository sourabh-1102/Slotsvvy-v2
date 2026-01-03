# SlotSavvy

AI-powered Post Office Time-Slot & Routing System.

## Features
- **Smart Slot Recommendations**: ML-driven time slot ranking based on historical delivery success and load.
- **Route Optimization**: Automated route generation using OR-Tools VRP.
- **End-to-End Workflow**: Sender booking, Receiver rescheduling, Staff dashboard, and Tracking.
- **Notification System**: Email (SendGrid) and SMS (Twilio) integration.

## Architecture
- **Apps**:
  - `apps/web`: Next.js 14 + Tailwind CSS
  - `apps/api`: Node.js Express + Prisma + PostgreSQL
  - `apps/ml`: Python FastAPI + LightGBM + OR-Tools (VRP)
- **Infrastructure**: Docker Compose

## Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local dev without Docker)
- Python 3.9+ (for local ML dev)

## Setup & Run (Local - Recommended if Docker fails)

1. **Install Dependencies**
   ```bash
   npm install
   # Python deps (if not auto-installed)
   python -m pip install -r apps/ml/requirements.txt
   ```

2. **Setup Database (SQLite config)**
   The system is now configured to use SQLite by default for easier local testing.
   ```bash
   # Generate Client & Push Schema
   npx prisma generate --schema=apps/api/prisma/schema.prisma
   npx prisma db push --schema=apps/api/prisma/schema.prisma
   
   # Modify .env to use: DATABASE_URL="file:./dev.db" if not already set.
   ```

3. **Seed Data**
   ```bash
   npm run seed
   ```

4. **Start Application**
   ```bash
   npm run dev
   ```
   - Web: http://localhost:3000
   - API: http://localhost:3001
   - ML: http://localhost:8000

## Docker (Optional)
If you have Docker installed and `docker compose` works:
```bash
docker compose up --build
```
*Note: You may need to revert .env to use postgresql://... if running with Docker.*

## Demo
To run the end-to-end verification script:
1. Ensure the stack is running (`docker-compose up`).
2. Run:
   ```bash
   npx ts-node demo/demo_script.ts
   ```

## Documentation
- **API Docs**: Swagger UI at `/api-docs` (if configured) or check `apps/api/src/routes`.
- **ML Training**: See `apps/ml/train_slot_recommender.ipynb`.





# Contributing to SlotSavvy version S.V.1

Thank you for your interest in contributing to SlotSavvy!

## How You Can Contribute
- Bug reports
- Feature suggestions
- Code improvements
- Documentation enhancements
- UI/UX suggestions

## Contribution Terms
By submitting any contribution to this project, you agree that:
- Your contribution is voluntary.
- SlotSavvy and its owner, Sourabh, may use, modify, and integrate your contribution.
- You do not retain ownership or licensing rights over the final integrated work.
- No compensation or royalties are owed for accepted contributions.

## Restrictions
- Contributions must not include copyrighted or proprietary material owned by third parties.
- Commercial use or redistribution of SlotSavvy is not permitted.

Thank you for helping improve SlotSavvy!

