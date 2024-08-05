import nodemailer from 'nodemailer'

const sendEmail =async (option) =>{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:"gmail",
        auth:{
            user:"gurdev191004@gmail.com",
            pass:"Gurdev@19"
        }

    }) 
    const mailOption = {
        from:"gurdev191004@gmail.com",
        to:option.email,
        subject:option.subject,
        text:option.message,
    }

    await transporter.sendMail(mailOption); 
}