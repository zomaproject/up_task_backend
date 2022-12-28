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
    usuarioConfirmar.token = ''
    await usuarioConfirmar.save()
    res.json({ msg: 'El usuario ha sido confirmado correctamente' })
  } catch (error) {
    console.log(error)
  }
}

const olvidePassword = async (req, res) => {

  const { email } = req.body

  const usuario = await Usuario.findOne({ email })

  if (!usuario) {
    const error = new Error('El usuario no existe')
    return res.status(404).send({ msg: error.message })
  }

  try {
    usuario.token = generarId()
    await usuario.save()
    res.send({ msg: 'Hemos enviado un correo con las instrucciones' })
  } catch (error) {
    console.log(error)
  }
}


const comprobarToken = async (req, res) => {
  const { token } = req.params

  const tokenValido = await Usuario.findOne({ token })
  if (tokenValido) {
    return res.send({ mdg: 'El token es valido y el usuario existe' })
  }

  const error = new Error('El token no es valido')
  return res.status(403).send({ msg: error.message })

}

const nuevoPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  const usuario = await Usuario.findOne({ token }) 
  if(usuario){
    usuario.password = password
    usuario.token = ''
    res.json({msg: "Password modificado Correctamente"})
  }
}


const perfil = async(req,res)=> {
  const {usuario} = req
  res.json(usuario)
}
export {
  comprobarToken,
  olvidePassword,
  registrar,
  autenticar,
  confirmar,
  nuevoPassword,
  perfil 
}


