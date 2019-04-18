import { Response, Request } from 'express'
import { ResponseSuccess, ResponseFail } from '../response/response'
import { Reviews, ReviewsI } from './reviews.model'
import { Codes } from '../response/codes'

// Retorna todos os reviews cadastrados.
export const getReviews = async (req: Request, res: Response): Promise<Response> => {
  const data = await Reviews.find()
  return ResponseSuccess(res, Codes.OK, data)
}

// Review pelo id
// Retorna o restaurante do id passado.
export const getReviewId = async (req: Request, res: Response): Promise<Response> => {
  try {
    // populate traz os campos do ref na query
    const data = await Reviews.findById(req.params.id)
      .populate('user', 'name') // traz a info do user com o name
      .populate('restaurant', 'name menu') // traz o name e o menu do restaurant
    if (data) {
      return ResponseSuccess(res, Codes.OK, data)
    } else {
      return ResponseFail(res, Codes.NOT_FOUND, data)
    }
  } catch (error) {
    return ResponseFail(res, Codes.NOT_FOUND, error)
  }
}

// Cadastra um novo review.
export const setReview = async (req: Request, res: Response): Promise<Response> => {
  try {
    const review: ReviewsI = await Reviews.create(req.body)
    return ResponseSuccess(res, Codes.CREATE, review)
  } catch (error) {
    return ResponseFail(res, Codes.ERROR, error)
  }
}
