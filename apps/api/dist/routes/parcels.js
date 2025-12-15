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
const notificationService_1 = require("../services/notificationService");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// Create Parcel
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { pincode, weight, senderId } = req.body;
        // Validate sender exists (mock or real)
        // For MVP, if senderId is not provided, use default
        let effectiveSenderId = senderId;
        if (!effectiveSenderId) {
            // Find first sender
            const sender = yield prisma.user.findFirst({ where: { role: 'SENDER' } });
            if (sender)
                effectiveSenderId = sender.id;
        }
        const parcel = yield prisma.parcel.create({
            data: {
                pincode,
                weight: parseFloat(weight),
                sender: { connect: { id: effectiveSenderId } }
            },
            include: { sender: true }
        });
        // Send Notification
        const senderEmail = ((_a = parcel.sender) === null || _a === void 0 ? void 0 : _a.email) || 'test@example.com';
        yield (0, notificationService_1.sendEmail)(senderEmail, 'Parcel Created', `Your parcel ${parcel.id} has been created.`);
        yield (0, notificationService_1.sendSMS)('+15550000000', `SlotSavvy: Parcel ${parcel.id} booked.`);
        res.json(parcel);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create parcel' });
    }
}));
// List Parcels (for staff/sender)
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield prisma.parcel.findMany();
    res.json(parcels);
}));
exports.default = router;
