import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as cors from 'cors'
import FeedsRoutes from './routes/feed'
import Fails from './routes/errors'

const app = express()

// middleware para log.
app.use(morgan('dev'))

// app.use(bodyParser.urlencoded({ extended: false }));  for <form>
app.use(bodyParser.json())

// Set cors
app.use(cors())

// Routes
app.use('/feed', FeedsRoutes)

// middleware para erros.
const erros: Fails = new Fails()
app.use(erros.errorsStatus)

export default app
