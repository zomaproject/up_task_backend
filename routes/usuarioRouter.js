import expres from "express"
import  checkAuth from '../middlewares/checkAuth.js'
import { autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar } from "../controllers/usuarioController.js"
// import Usuario from "../models/Usuario.js"


const router = expres.Router()
// Auntenticación,  Registro y confirmación de Usuario
router.post('/', registrar)  // Crea un nuevo usuario

router.post('/login', autenticar)

router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)

router.route('/olvide-password/:token')
  .get(comprobarToken)
  .post(nuevoPassword)


router.get('/perfil',checkAuth , perfil)
export default router