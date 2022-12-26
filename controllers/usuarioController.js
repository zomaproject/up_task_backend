import Usuario from "../models/Usuario.js"

const registrar = async (req, res) => {

  const {email } = req.body
  const usuarioExiste =  await Usuario.findOne({email})

  if(usuarioExiste){
    const error = new Error('El usuario ya esta registrado')
    return res.status(404).json({msg: error.message})
  }


  try {
    const usuario = new Usuario(req.body)
    const usuarioAlmacenado = await usuario.save()
    res.send(usuarioAlmacenado)
  } catch (error) {
    console.log(error)
  }
}

export {
  registrar
}