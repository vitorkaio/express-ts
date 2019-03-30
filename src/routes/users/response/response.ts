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

export const ResponseFail = (res: Response, code: number, error: {}): Response => {
  return res.status(code).json({
    msg: 'fail',
    code,
    data: error
  })
}
