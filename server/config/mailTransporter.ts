import { createTransport } from 'nodemailer'

import { MAIL_TRANSPORTER_EMAIL, MAIL_TRANSPORTER_PASS } from './variables'

export const MailTransporter = createTransport({
  auth: {
    user: MAIL_TRANSPORTER_EMAIL,
    pass: MAIL_TRANSPORTER_PASS,
  },
  host: 'smtp.gmail.com',
  secure: true,
})
