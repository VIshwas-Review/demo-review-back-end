import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 5000
export const DB_URL = process.env.CONNECTION_URL as string
export const MAIL_TRANSPORTER_EMAIL = process.env.NODE_MAILER_EMAIL as string
export const MAIL_TRANSPORTER_PASS = process.env.NODE_MAILER_EMAIL_PASS as string
export const JWT_SECRET = process.env.JWT_SECRET as string
