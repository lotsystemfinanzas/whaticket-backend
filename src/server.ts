import express from 'express';
import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server started on port: ${process.env.PORT}`);
});

initIO(server);
StartAllWhatsAppsSessions();
gracefulShutdown(server);

import integrationRoutes from './routes/integrationRoutes';
import metaRoutes from './routes/metaRoutes';
import metaWebhookRoutes from './routes/metaWebhookRoutes';
