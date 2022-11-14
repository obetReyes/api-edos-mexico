import express, {Request, Response, NextFunction} from "express"
import estadosRoutes from "./estados/routes/estados"
import municipiosRoutes from "./municipios/routes/municipios"
import coloniasRoutes from "./colonias/routes/colonias"
import cors from "cors"
import { rateLimit } from "express-rate-limit"


const router = express()

const corsOptions ={
    origin:"*",
    allowHeaders:'x-api-key'
} 
const apiDataLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
	max: 600, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler:(req:any, res:any) => {
        return res.status(400).json({
            error: 'solo puedes hacer 600 llamadas a la api por hora'
          })
      }
})

router.use(apiDataLimiter)
router.get('/', cors(corsOptions), (req:Request, res:Response) => {
    res.status(200).json({data:'bienvendo a  la api  de infomexico para guia de uso accede  al sitio web',
details:"http://infomexicoapi.com"})
})
router.use('/api/mexico/',cors(corsOptions), estadosRoutes)
router.use('/api/mexico/',cors(corsOptions), municipiosRoutes)
router.use('/api/mexico/',cors(corsOptions),coloniasRoutes)

export default router;