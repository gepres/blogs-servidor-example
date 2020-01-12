const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { name, email, asunto, message } = req.body;

    contentHTML = `
        <h1>Información del usuario</h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Correo: ${email}</li>
            <li>Asunto: ${asunto}</li>
        </ul>
        <p>${message}</p>
    `;
  
    let transporter = nodemailer.createTransport({
        host: 'mail.gepresdesign.xyz',
        port: 26,
        secure: false,
        auth: {
            user: 'genaropretill@gepresdesign.xyz',
            pass: process.env.PASSWORD_EMAIL
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: " 'gepresblogs contacto' <genaropretill@gepresdesign.xyz>",
        to: 'genaropretill@gmail.com',
        subject:`${asunto}`,
        // text: 'Hello World'
        html: contentHTML
    })


    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


    // res.redirect('/success.html');
});

module.exports = router;