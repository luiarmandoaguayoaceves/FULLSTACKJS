import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
console.log(datos);
    //Enviar Email

    const {email, nombre, token } = datos;

    const info = await transporter.sendMail({
        from: "APV - Administrador de pacientes de Veterinaria",
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
        <p>Tu cuenta ya esta lista, solo deber comprobarla en el siguiente enlace:
        <a href="${process.env.FRONT_END}/confirmar/${token}">Comprobar cuenta</a></p>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `

    });

    console.log('Mensaje Enviado: %s,', info.messageId);
}

export default emailRegistro;