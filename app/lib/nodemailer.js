import nodeMailer from 'nodemailer'

const smtpConfig = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}

const transporter = nodeMailer.createTransport(smtpConfig, {
  from: process.env.MAIL_USER
})

export default transporter
