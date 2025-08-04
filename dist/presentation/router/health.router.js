"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_controller_1 = require("../controller/health.controller");
// Si quieres condicionar acceso por entorno, puedes importar isDev/isProd...
// import { isDev, isProd, isStaging, isTest } from '../../utils/env'
const healthrouter = (0, express_1.Router)();
// GET /health
healthrouter.get('/health', health_controller_1.healthController.status);
exports.default = healthrouter;
