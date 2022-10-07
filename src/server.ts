import express from 'express';
import logging from './utils/logging';
import config from './utils/config';
import appRouter from "./app"
const NAMESPACE = "SERVER"

export const app = express();

app.use(appRouter)

   app.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

