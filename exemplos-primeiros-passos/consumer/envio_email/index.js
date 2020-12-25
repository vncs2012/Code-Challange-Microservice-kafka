import nodemailer from "nodemailer";
import { rumResponseEnvio } from '../kafka'

const send = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "22f3ea9440b99e",
        pass: "fe715f1f8ff623"
    }
});

export const sendEmail = (params) => {
    const { name, email, _id } = params
    console.log(`${name} - ${email} - ${_id}`)
    const msg = {
        from: `Vinicius Miranda ${email}`, // sender address
        to: `${name} - ${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `Hello world? ${name} - ${_id}`, // plain text body
        html: `<b>Hello world? ${name} - ${_id}</b>`, // html body
    }
    send.sendMail(msg).then(info => {
        let now = new Date();
        const res = [{ id: _id, datatime: now.toISOString() }]
        console.log('Message sent successfully!');
        rumResponseEnvio(res)
    }).catch(err => { console.log(err) })
    send.close()
}

