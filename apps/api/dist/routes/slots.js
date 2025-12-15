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
const mlService_1 = require("../services/mlService");
const router = express_1.default.Router();
router.get('/recommend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode, date, weight } = req.query;
    if (!pincode || !date) {
        return res.status(400).json({ error: 'Missing pincode or date' });
    }
    const w = weight ? parseFloat(weight) : 1.0;
    const slots = yield (0, mlService_1.getSlotRecommendations)(pincode, date, w);
    res.json(slots);
}));
exports.default = router;
