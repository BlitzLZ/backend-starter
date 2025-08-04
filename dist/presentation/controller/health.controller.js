"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = void 0;
exports.healthController = {
    status: async (req, res) => {
        //const { appClient, startedAt } = req.app.locals.scraper
        const start = Date.now();
        try {
            const pkg = require('../../../package.json');
            const data = {
                service: process.env.SERVICE_NAME || 'scraper-service',
                version: pkg.version,
                env: process.env.NODE_ENV || 'development',
                uptime_sec: process.uptime(),
                startedAt: res.app?.locals?.scraper?.startedAt,
            };
            const response = {
                status: 'OK',
                statusCode: 200,
                message: 'Service healthy',
                data,
                computed_time_ms: Date.now() - start,
            };
            return res.status(200).json(response);
        }
        catch (e) {
            const response = {
                status: 'NOT_OK',
                statusCode: 500,
                message: e?.message || 'Internal Server Error',
                data: null,
                computed_time_ms: Date.now() - start,
            };
            return res.status(500).json(response);
        }
    },
};
