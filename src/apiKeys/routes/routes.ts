import express  from "express";
import { createApiKey } from "../controllers/createApiKey";
import {apiKeyList} from "../controllers/ApiKeyList"
import { deleteApiKey } from "../controllers/deleteApiKey";
import { verifyToken } from "../../middlewares/verifyToken";
import  rateLimit  from "express-rate-limit";
import { validateApiKey } from "../../middlewares/validateApiKey";
const router = express.Router()


const apiKeyLimiter = rateLimit({
    windowMs: 60 * 60 * 20, // 1.2 minutes
	max: 30, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler:(req:any, res:any) => {
        return res.status(400).json({
            error: 'no hacer esta peticion tantas veces, por favor intentalo mas tarde'
          })
      }
})

router.post('/apikey',apiKeyLimiter, verifyToken, createApiKey)
router.post('/apikeys',apiKeyLimiter ,verifyToken, apiKeyList)
router.delete('/apikeys/:apikey' ,verifyToken, validateApiKey, deleteApiKey)

export = router 