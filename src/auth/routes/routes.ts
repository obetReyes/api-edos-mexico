import express from "express"
import { createSignUp } from "../controllers/createSignUp"
import { createSignin } from "../controllers/createSignIn"
import { createSignOUt } from "../controllers/createSignOut"

import { authValidation } from "../../middlewares/authValidation"

import { verifyToken } from "../../middlewares/verifyToken"
import authSchema from "../../utils/validations"

const router = express.Router()

router.post('/registro', authValidation(authSchema), createSignUp)
router.post('/ingreso', authValidation(authSchema), createSignin)
router.post('/egreso',verifyToken, createSignOUt)



export = router

