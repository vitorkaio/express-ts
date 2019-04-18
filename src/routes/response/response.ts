import { Response } from 'express'

/**
 * Retorna uma resposta de sucesso.
 *
 * @param {Response} res response da rota
 * @param {number} code código http
 * @param {{}} data dados a ser enviado
 * @returns {Response} Response
 */
export const ResponseSuccess = (res: Response, code: number, data: {}): Response => {
  return res.status(code).json({
    msg: 'success',
    code,
    data
  })
}

export const ResponseFail = (res: Response, code: number, err: Error | {}): Response => {
  const listErrors: {}[] = []
  if (err instanceof Error) {
    for (const key in err['errors']) {
      listErrors.push(err['errors'][key].message)
    }
  }
  return res.status(code).json({
    msg: 'fail',
    code,
    data: listErrors.length === 0 ? err : listErrors
  })
}
