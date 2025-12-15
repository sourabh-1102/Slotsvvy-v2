"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const parcels_1 = __importDefault(require("./routes/parcels"));
const slots_1 = __importDefault(require("./routes/slots"));
const routes_1 = __importDefault(require("./routes/routes"));
const tracking_1 = __importDefault(require("./routes/tracking"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
exports.prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/parcels', parcels_1.default);
app.use('/api/slots', slots_1.default);
app.use('/api/routes', routes_1.default);
app.use('/api/tracking', tracking_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});
// Export for Vercel
exports.default = app;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
