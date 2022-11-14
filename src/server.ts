import express, {Request, Response, NextFunction} from 'express';
import logging from './utils/logging';
import config from './utils/config';
import appRouter from "./appRouter"
import apiRouter from "./apiRouter"
import reportError from '../reportError';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler';
import { parseErrors } from './middlewares/parseErrors';
import { error404 } from './middlewares/error404';
//Clusters of Node.js processes can be used to run multiple instances of Node.js that can distribute workloads among their application threads.
const NAMESPACE = "SERVER"

export const app = express();
app.use(helmet())
app.use(express.json({
    limit:"1kb"
}))
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser())
app.use((req:Request, res:Response, next:NextFunction) => {
  /** Log the req */
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
      /** Log the res */
      logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
  })
  
  next();
});

app.use(apiRouter)
app.use(appRouter)
app.use(errorHandler)
app.use(parseErrors)
app.use(error404)
//The cluster module provides a way of creating child processes that runs simultaneously and share the same server port.
// Node.js runs single threaded programming, which is very memory efficient, but to take advantage of computers multi-core systems, the Cluster module allows you to easily create child processes that each runs on their own single thread, to handle the load.

/*
let workers = require('os').cpus().length;

if (cluster.isPrimary) {

console.log('start cluster with %s workers', workers);

  for (let i = 0; i < workers; ++i) {
    let worker = cluster.fork().process;
    console.log('worker %s started.', worker.pid);
  }

  //This can be used to restart the worker by calling .fork() again.
  cluster.on('exit', function(worker) {
    console.log('worker %s died. restart...', worker.process.pid);
    //Creates a new worker, from a master
    cluster.fork();
  });

} else {

}
*/
app.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

//if there's an uncaught exception or unhandlerejection it will report the error to an email
process.on('uncaughtException', function (err) {
  reportError(String(err), String(err.name))
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})
process.on("unhandledRejection", (err:any) => {
  reportError(String(err), String(err.name))
   console.log("--------------------------");
   process.exit(1);
 });   