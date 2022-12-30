import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {

  const { token, email, nombre } = datos

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "01ced72f321287",
      pass: "bbd57d8f695987"
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