import  express  from "express"
import { coloniasList } from "../controllers/coloniasList"
import { validateApiKey } from "../../middlewares/validateApiKey"
const router = express.Router()

router.get('/colonias/:municipio', validateApiKey, coloniasList)

export  = router
