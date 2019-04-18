import { Response, Request } from 'express'
import { ResponseSuccess, ResponseFail } from '../response/response'
import { Restaurant, RestaurantI } from './restaurants.model'
import { Codes } from '../response/codes'

// Retorna todos os restaurantes cadastrados.
export const getRestaurants = async (req: Request, res: Response): Promise<Response> => {
  const data = await Restaurant.find()
  return ResponseSuccess(res, Codes.OK, data)
}

// Insere um novo restaurante.
export const setRestaurant = async (req: Request, res: Response): Promise<Response> => {
  try {
    const rest: RestaurantI = await Restaurant.create(req.body)
    return ResponseSuccess(res, Codes.CREATE, rest)
  } catch (error) {
    return ResponseFail(res, Codes.ERROR, error)
  }
}

// Retorna o restaurante do id passado.
export const getRestaurantsId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await Restaurant.findById(req.params.id)
    if (data) {
      return ResponseSuccess(res, Codes.OK, data)
    } else {
      return ResponseFail(res, Codes.NOT_FOUND, data)
    }
  } catch (error) {
    return ResponseFail(res, Codes.NOT_FOUND, error)
  }
}

// Menu do restaurante passado.
export const getRestaurantIdMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    // +menu indica que é uma projection, o menu será trazido na query.
    const { menu } = await Restaurant.findById(req.params.id, '+menu')
    if (menu) {
      return ResponseSuccess(res, Codes.OK, menu)
    } else {
      return ResponseFail(res, Codes.NOT_FOUND, menu)
    }
  } catch (error) {
    return ResponseFail(res, Codes.NOT_FOUND, error)
  }
}

// Insere um menu no restaurante.
export const updateRestaurantMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const rest: RestaurantI = await Restaurant.findById(req.params.id)
    if (rest) {
      rest.menu = req.body
      rest.save()
      return ResponseSuccess(res, Codes.OK, rest)
    } else {
      return ResponseFail(res, Codes.NOT_FOUND, null)
    }
  } catch (error) {
    return ResponseFail(res, Codes.ERROR, error)
  }
}

// Atualiza o menu de um restaurante.
