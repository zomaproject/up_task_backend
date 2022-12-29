import {
  obtenerProyecto,
  obtenerProyectos,
  nuevoProyecto,
  eliminarProyecto,
  agregarColaborador,
  editarProyecto,
  eliminarColaborador
} from '../controllers/proyectoController.js'
import checkAuth from '../middlewares/checkAuth.js'

import express from 'express'

const router = express.Router()

router.route('/')
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto)

router.route('/:id')
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto)

router.post('/agregar-colaborador', checkAuth, agregarColaborador)
router.post('/eliminar-colaborador', checkAuth, eliminarColaborador)


export default router