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
        from: 'Fithub-DevTeam <noreply@fithub.com>',
        subject: 'Confirmación de Cuenta Fithub',
        htmlBodyTemplate:
            `<div>
                <h1 style="text-align: center;">
                    <strong>Bienvenido a <span style="color: #42b983; font-weight: 700; font-size: 35px;">Fithub</span></strong>
                </h1>
                <p style="text-align: center; font-size: 18px; font-weight: 700;">
                   Usted a creado una cuenta en FitHub correctamente.<br>
                   ¡Muchas gracias por registrarse!<br>
                   Por razones de seguridad, se requiere que usted verifique su email antes de continuar.<br>
                </p>
                <div style="display: flex; justify-content: center;">
                    <button style="color: white;
                            border: none;
                            text-align: center;
                            background-color: #42b983;
                            border-radius: 25px;
                            font-size: 24px;
                            font-weight: 400;
                            text-decoration: none;
                            outline: none;
                            width: 300px;
                            height: 70px;
                            cursor: pointer;">
                        <a href="<%CONFIRM_LINK%>" style="color: white; text-decoration: none;" >VERIFIQUE SU EMAIL</a>
                     </button>
                </div>
                     <p style="text-align: center; font-size: 18px; font-weight: 700;">
                       Con energía lo esperamos para entrenar juntos,<br>
                       El Equipo de Fithub.
                     </p>
                     <p style="text-align: center; font-size: 12px; font-weight: 700;">
                        <span>Valido hasta <%EXPIRATION_DATE%></span>
                     </p>
              </div>`,
        confirmationLink: 'http://localhost:4000/verify?email=<%EMAIL%>&code=<%CODE%>',
        codeExpirationInterval: 24 * 60 * 60 * 1000
    }
}