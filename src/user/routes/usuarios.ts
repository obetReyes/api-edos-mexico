import express from "express"
import { verifyToken } from "../../middlewares/verifyToken"
import { readUser } from "../controllers/readUser"
const router = express.Router()
router.get('/usuario',verifyToken, readUser)

export default router