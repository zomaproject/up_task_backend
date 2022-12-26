import expres from "express"
import { registrar } from "../controllers/usuarioController.js"


const router = expres.Router()
// Auntenticación,  Registro y confirmación de Usuario
router.post('/', registrar)  // Crea un nuevo usuario





export default router