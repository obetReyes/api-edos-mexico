import express from "express"
import { createSignUp } from "../controllers/createSignUp"
import { createSignin } from "../controllers/createSignIn"
import { createSignOUt } from "../controllers/createSignOut"
import { authValidation } from "../../middlewares/authValidation"
import { verifyToken } from "../../middlewares/verifyToken"
import authSchema from "../../utils/validations"
//express rate limit is a library which implements rate limit per window
import rateLimit from 'express-rate-limit'

const router = express.Router()


// in the next lines we will use the express rate limit library to limit the signup and logout  (registrosalidalimiter) and the sigIn rate limit (ingresoLimite)r we are creating two limiters becasue the signup and the signin need to have differente messages

const registroLimitier = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
	max: 3, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler:(req:any, res:any) => {
        return res.status(400).json({
            error: 'no hacer esta peticion tantas veces, por favor intentalo mas tarde'
          })
      }
})

const Ingresolimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler:(req:any, res:any) => {
        return res.status(429).json({
            error: 'has tratado de iniciar sesion muchas veces vuelve a intentarlo mas tarde'
          })
      }
    }
)


router.post('/registro',registroLimitier, authValidation(authSchema), createSignUp)
router.post('/ingreso',  Ingresolimiter,  authValidation(authSchema), createSignin)
router.post('/egreso', verifyToken, createSignOUt)



export = router

