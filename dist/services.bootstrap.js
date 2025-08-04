"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const health_router_1 = __importDefault(require("./presentation/router/health.router"));
require('dotenv').config({ debug: false });
const expressApp = (0, express_1.default)();
exports.expressApp = expressApp;
expressApp.use((0, cors_1.default)());
expressApp.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
}));
expressApp.use(express_1.default.json());
// Rutas
expressApp.use(health_router_1.default);
