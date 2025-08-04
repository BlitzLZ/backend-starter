"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_bootstrap_1 = require("./services.bootstrap");
const { SERVICE_HTTP_PORT = 3000, NODE_ENV = 'development' } = process.env;
services_bootstrap_1.expressApp.locals.scraper = {
    appClient: `ScraperService${NODE_ENV === 'development' ? '_DEV' : ''}`,
    startedAt: new Date().toISOString(),
};
services_bootstrap_1.expressApp.listen(SERVICE_HTTP_PORT, () => {
    console.log(`Scraper Service listening on port ${SERVICE_HTTP_PORT}`);
});
