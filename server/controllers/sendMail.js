import nodemailer from 'nodemailer';

const SendMail = async (email, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'roshan.kush208@gmail.com',
            pass: 'didf fecy gdno sncm'
        }
    })

    const mailOptions = {
        from: 'servicebazaar99@gmail.com',
        to: `${email}`,
        subject: 'Welcome to Service Bazaar',
        html: html
    }

    try {

        const result = await transporter.sendMail(mailOptions);

    } catch (err) {
        console.log("error while sending mail", err);
    }
}

export default SendMail;