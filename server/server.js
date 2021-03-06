import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import childRoutes from './routes/childRoutes.js'
import parentRoutes from './routes/parentRoutes.js'
import { notFound, asyncErrorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()

app.get('/', (req, res) => res.send('API Running'))

app.get('/api', (req, res) => res.send([{ name: 'Api running' }]))

app.use('/api/child', childRoutes)
app.use('/api/parent', parentRoutes)

app.use(notFound)
app.use(asyncErrorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
)
