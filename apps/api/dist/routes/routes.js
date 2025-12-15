"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const mlService_1 = require("../services/mlService");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/compute', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, pincode } = req.query; // or body
    // User prompt logic: POST /api/routes/compute?date=YYYY-MM-DD
    const dateStr = date || new Date().toISOString().split('T')[0];
    const pin = pincode || '110001'; // Default or from user
    // 1. Fetch parcels for that date/pincode
    // In reality, this would filter by scheduledDate
    const parcels = yield prisma.parcel.findMany({
        where: {
            pincode: pin
            // deliveryDate roughly matches
        }
    });
    if (parcels.length === 0) {
        return res.json([]);
    }
    // 2. Call ML Service
    const routes = yield (0, mlService_1.computeRoutes)(dateStr, pin, parcels);
    // 3. Save routes to DB (optional for MVP but good)
    // ...
    res.json(routes);
}));
exports.default = router;
