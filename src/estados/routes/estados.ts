import  express  from "express"
import { EstadosList } from "../controllers/estadosList"
import { validateApiKey } from "../../middlewares/validateApiKey"

const router = express.Router()
router.get('/estados',validateApiKey, EstadosList)

export  = router
