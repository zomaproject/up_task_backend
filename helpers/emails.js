import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {

  const { token, email, nombre } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyecto" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Comprueba tu cuenta',
    text: 'Comprueba tu cuenta en UpTask',
    html: ` <p>Hola ${nombre} Comprueba tu cuenta en UpTask</p>

    <p>Tu cuenta ya esta casí lista, solo debes comprobarla en el siguiente enlace:</p>

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprobar Cuenta </a>

    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
     `
  })
}


export const emailOlvidePassword = async (datos) => {

  const { token, email, nombre } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyecto" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Reestablece tu password',
    text: 'Comprueba tu cuenta en UpTask',
    html: ` <p>Hola ${nombre} has solicitado reestablecer tu  password</p>

    <p>Sigue el siguiente enlace para generar uno nuevo</p>

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer  Password</a>

    <p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>
     `
  })
}