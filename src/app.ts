import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as mongoose from 'mongoose'

import { DB_URL } from './env'

import FeedsRoutes from './routes/feed'
import UsersRoutes from './routes/users/users.route'
import Fails from './routes/errors'

const app = express()

// middleware para log.
app.use(morgan('dev'))

// app.use(bodyParser.urlencoded({ extended: false }));  for <form>
app.use(bodyParser.json())

// Set cors
app.use(cors())

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  // Verifica se o mongo está conectado.
  app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (mongoose.connection.readyState !== 1) {
      res.status(500).json({
        'code': 500,
        'msg': 'database disconnect'
      })
    }
    return next()
  })

  // Routes
  app.use('/feed', FeedsRoutes)
  app.use('/users', UsersRoutes)

  // middleware para erros.
  const erros: Fails = new Fails()
  app.use(erros.errorsStatus)
}).catch(() => {
  console.log('database disconnect')
  process.exit(1)
})

export default app
