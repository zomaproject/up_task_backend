import expres from "express"
import { autenticar, confirmar, registrar } from "../controllers/usuarioController.js"
import Usuario from "../models/Usuario.js"


const router = expres.Router()
// Auntenticación,  Registro y confirmación de Usuario
router.post('/', registrar)  // Crea un nuevo usuario

router.post('/login', autenticar)

router.get('/confirmar/:token', confirmar)


export default router