import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import { PORT, DB_URL } from './config/variables'
import userAuthentication from './middleware/authentication'
import airlineRoutes from './routes/airline'
import userRoutes from './routes/user'

const app = express()

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(userAuthentication)
app.use('/airlines', airlineRoutes)
app.use('/user', userRoutes)

mongoose
  .connect(DB_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))
