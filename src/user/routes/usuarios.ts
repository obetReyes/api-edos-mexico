import express from "express"
import { verifyToken } from "../../middlewares/verifyToken"
import { readUser } from "../controllers/readUser"
import  rateLimit  from "express-rate-limit"
const router = express.Router()

const apiDataLimiter = rateLimit({
    windowMs: 60 * 60 * 20, // 60 minutes
	max: 60, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler:(req:any, res:any) => {
        return res.status(400).json({
            error: 'se rebaso el limit de llamadas al endpoint'
          })
      }
})
router.get('/usuario', verifyToken, readUser)

export default router


