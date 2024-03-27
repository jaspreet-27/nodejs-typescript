import express from 'express'
import productRouter from '../routes/products'
import userRouter from '../routes/users'

function createServer() {
  const app = express()
  app.use(express.json())
  /* Routes */
  app.use('/v1/product', productRouter)
  app.use('/v1/user', userRouter)
  return app
}

export default createServer
