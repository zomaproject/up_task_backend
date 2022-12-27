import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import Usuario from "../models/Usuario.js"

const registrar = async (req, res) => {

  const { email } = req.body
  const usuarioExiste = await Usuario.findOne({ email })

  if (usuarioExiste) {
    const error = new Error('El usuario ya esta registrado')
    return res.status(404).json({ msg: error.message })
  }


  try {
    const usuario = new Usuario(req.body)
    usuario.token = generarId()
    const usuarioAlmacenado = await usuario.save()
    res.send(usuarioAlmacenado)
  } catch (error) {
    console.log(error)
  }
}

const autenticar = async (req, res) => {

  const { email, password } = req.body

  // buscar el email del usuario en la base de datos 

  const usuario = await Usuario.findOne({ email })

  if (!usuario) {
    const error = new Error('El usuario no existe')
    return res.status(404).send({ msg: error.message })
  }

  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(403).send({ msg: error.message })
  }

  if (await usuario.comprobarPassword(password)) {
    res.send({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id)
    })
  } else {
    const error = new Error('El password es incorrecto')
    return res.status(403).send({ msg: error.message })
  }

}

const confirmar = async (req, res) => {
  const { token } = req.params
  const usuarioConfirmar = await Usuario.findOne({ token })
  if (!usuarioConfirmar) {
    const error = new Error('Token no valido')
    return res.status(403).json({ msg: error.message })
  }

  try {
    usuarioConfirmar.confirmado = true
    usuarioConfirmar.token  = ''
    await usuarioConfirmar.save()
    res.json({msg: 'El usuario ha sido confirmado correctamente'})
  } catch (error) {
    console.log(error) 
  }
}

export {
  registrar,
  autenticar,
  confirmar
}


