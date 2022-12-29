import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where('Usuario').equals(req.usuario)
  res.send(proyectos)
}

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body)
  proyecto.creador = req.usuario._id
  console.log(req.usuario)
  try {
    const proyectoAlmacenado = await proyecto.save()
    res.send(proyectoAlmacenado)
  } catch (error) {
    console.log(error)
  }
}

const obtenerProyecto = async (req, res) => {
  const { id } = req.params

  const proyecto = await Proyecto.findById(id)

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado')
    return res.status(403).send({ msg: error.message })
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Accion no valida')
    return res.status(403).send({ msg: error.message })
  }

  const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)
  res.json({
    proyecto,
    tareas
  })
}

const editarProyecto = async (req, res) => {

  const { id } = req.params

  const proyecto = await Proyecto.findById(id)

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado')
    return res.status(403).send({ msg: error.message })
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Accion no valida')
    return res.status(403).send({ msg: error.message })
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre
  proyecto.cliente = req.body.cliente || proyecto.cliente
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
  try {
    const proyectoAlmacenado = proyecto.save()
    res.send(proyecto)
  } catch (error) {
    console.log(error) 
  }
}

const eliminarProyecto = async (req, res) => {

  const { id } = req.params

  const proyecto = await Proyecto.findById(id)

  if (!proyecto) {
    const error = new Error('Proyecto no encontrado')
    return res.status(403).send({ msg: error.message })
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Accion no valida')
    return res.status(403).send({ msg: error.message })
  }
  try {
    await proyecto.deleteOne()
    res.json({msg: 'Proyecto eliminado'})
  } catch (error) {
    console.log(error) 
  }
}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}






export {
  obtenerProyecto,
  obtenerProyectos,
  nuevoProyecto,
  eliminarProyecto,
  agregarColaborador,
  editarProyecto,
  eliminarColaborador
}