// https://ethereal.email/
module.exports = {
    service: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        user: 'casimir.christiansen@ethereal.email',
        password: 'vqsngAXzHTMZA862gH'
    },
    registerVerification: {
        from: 'Exercise <noreply@exercise.com>',
        subject: 'Confirmación de Cuenta Fithub',
        htmlBodyTemplate:
            `<div>
                <h1 style="text-align: center;">
                    <strong>Bienvenido a <span style="color: #42b983;">FitHub</span></strong>
                </h1>
                <p>
                   Usted a creado una cuenta en FitHub correctamente.<br>
                   ¡Muchas gracias por registrarse!<br>
                   Por razones de seguridad, se requiere que usted verifique su email antes de continuar.<br>
                </p>
                <p>
                    <span>Valido hasta <%EXPIRATION_DATE%></span>
                </p>
                <div>
                    <button>
                    <a href="<%CONFIRM_LINK%>">VERIFIQUE SU EMAIL</a>
                    </button>
                <div>
                <h1 style="text-align: center;">
                    <strong>(Esto se borra desps mepa) Your code is <span style="color: #fc987e;"><%CODE%></span></strong>
                </h1>
                <p>
                   Con energía lo esperamos para entrenar juntos,<br>
                   El Equipo de Fithub.
                </p>
            </div>`,
        confirmationLink: 'http://localhost:8080/verification?user=<%USER_ID%>&code=<%CODE%>',
        codeExpirationInterval: 24 * 60 * 60 * 1000
    }
}