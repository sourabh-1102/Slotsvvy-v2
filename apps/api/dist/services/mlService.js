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
exports.computeRoutes = exports.getSlotRecommendations = void 0;
const axios_1 = __importDefault(require("axios"));
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';
const getSlotRecommendations = (pincode, date, weight) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${ML_SERVICE_URL}/predict_slots`, {
            params: { pincode, date, weight }
        });
        return response.data;
    }
    catch (error) {
        console.error('ML Service unavailable, using fallback');
        // Simple fallback
        return [
            { slot_id: 's-fallback-1', start: new Date().toISOString(), end: new Date().toISOString(), score: 0.5, capacity_left: 5 }
        ];
    }
});
exports.getSlotRecommendations = getSlotRecommendations;
const computeRoutes = (date, pincode, parcels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${ML_SERVICE_URL}/compute_routes`, {
            date, pincode, parcels
        });
        return response.data;
    }
    catch (error) {
        console.error("Routing failed", error);
        return [];
    }
});
exports.computeRoutes = computeRoutes;
