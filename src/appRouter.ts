import express from 'express';
import autRouter from "./auth/routes/routes"
import usuariosRouter from "./user/routes/usuarios"
import apikeyRouter from "./apiKeys/routes/routes"
import cors from "cors"


const router = express();





const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true,
}
/** Routes go here */

router.use('/app/aut/',cors(corsOptions),autRouter)
router.use('/app/usuarios/',cors(corsOptions), usuariosRouter)
router.use('/app/',cors(corsOptions),apikeyRouter)



export default router