import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 5000
export const DB_URL = process.env.CONNECTION_URL as string
export const MAIL_TRANSPORTER_EMAIL = process.env.NODE_MAILER_EMAIL as string
export const MAIL_TRANSPORTER_PASS = process.env.NODE_MAILER_EMAIL_PASS as string
export const JWT_SECRET = process.env.JWT_SECRET as string
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string
export const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN as string
