import * as express from 'express'

class Fails {
  public errorsStatus = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.status(404).json({
      error: 'Not Found'
    })
    next()
  }
}

export default Fails
