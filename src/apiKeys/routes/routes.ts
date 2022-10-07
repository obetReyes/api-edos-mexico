import express  from "express";
import { createApiKey } from "../controllers/createApiKey";

const router = express.Router()

router.post('/apikey', createApiKey)

export = router