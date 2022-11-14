import  express  from "express"
import { municipiosList } from "../controllers/municipiosList"
import { validateApiKey } from "../../middlewares/validateApiKey"

const router = express.Router()

router.get('/municipios/:estado',validateApiKey, municipiosList)


export  = router
