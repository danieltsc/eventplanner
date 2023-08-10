import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import eventRoutes from './routes/events'
import categoryRoutes from './routes/categories'
import sequelize from './db/connection'
import Category from './models/categories'
import UserEvent from './models/user_events'
import Event from './models/Events'

dotenv.config()

const app: Application = express()

const PORT = process.env.PORT || 8000
const FORCE_REFERSH_DB = process.env.FORCE_REFRESH_DB === 'true'

// Middlewares
app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1/events', eventRoutes)
app.use('/api/v1/categories', categoryRoutes)

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({ message: 'REST API alive and well :)' })
})

sequelize.sync({ force: FORCE_REFERSH_DB }).then(async () => {
  await UserEvent.sync()
  await Event.sync()
  await Category.sync()

  Event.associate({ UserEvent });
  UserEvent.associate({ Event });

  console.log('Database connection established')
  app.listen(PORT, () => console.log(`REST API runnning on port ${PORT}...`))
})