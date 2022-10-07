import express, {Request, Response, NextFunction} from 'express';
import logging from './utils/logging';
import estadosRouter from "./estados/routes/estados"
import municipiosRouter from "./municipios/routes/municipios"
import coloniasRoute from "./colonias/routes/colonias"
import autRouter from "./auth/routes/routes"
import usuariosRouter from "./user/routes/usuarios"
import apikeyRouter from "./apiKeys/routes/routes"
import { cors } from './middlewares/cors';
import { error404 } from './middlewares/error404';
import cookieParser from "cookie-parser"
import { parseErrors } from './middlewares/parseErrors';


const router = express();
const NAMESPACE = 'APP';


router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cors)
router.use(cookieParser())
router.use((req:Request, res:Response, next:NextFunction) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Routes go here */

router.use('/api/mexico/',  estadosRouter)
router.use('/api/mexico/', municipiosRouter)
router.use('/api/mexico/', coloniasRoute)
router.use('/api/aut/', autRouter)
router.use('/api/usuarios/', usuariosRouter)
router.use('/api/', apikeyRouter)

router.use(error404)
router.use(parseErrors)
export default router