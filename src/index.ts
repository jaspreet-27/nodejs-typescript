import express from 'express'
import { urlencoded, json } from 'body-parser'
import helmet from 'helmet'
import 'dotenv/config'

import productRouter from './routes/products'
import userRouter from './routes/users'
import { config } from './config/default'

const app = express()

const key: string = process.env.NODE_ENV || 'local'
const PORT = config[key].port || 8005
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(helmet())

/* Routes */
app.use('/v1/product', productRouter)
app.use('/v1/user', userRouter)

app.listen(PORT, () => {
  console.log('Server listening port ' + PORT)
})
