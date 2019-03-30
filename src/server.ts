// import * as http from 'http'
import app from './app'
import { PORT } from './env'

const port = process.env.PORT || PORT

app.listen(port, () => {
  console.log('App listening on port ' + port)
})
