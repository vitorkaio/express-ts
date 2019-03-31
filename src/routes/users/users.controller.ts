import { Response, Request } from 'express'
import { ResponseSuccess, ResponseFail } from './response/response'
import { User, UserI } from './users.model'
import { Codes } from './response/codes'

// Retorna todos os usuários cadastrados.
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const data = await User.find()
  return ResponseSuccess(res, Codes.OK, data)
}

// Retorna um usuário.
export const getUserId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await User.findById(req.params.id)
    if (data) {
      return ResponseSuccess(res, Codes.OK, data)
    } else {
      return ResponseFail(res, Codes.NOT_FOUND, data)
    }
  } catch (error) {
    return ResponseFail(res, Codes.NOT_FOUND, error)
  }
}

// Insere um novo usuário no sistema.
export const setUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: UserI = await User.create(req.body)
    user.password = undefined // Remove o password da resposta
    return ResponseSuccess(res, Codes.CREATE, user)
  } catch (error) {
    return ResponseFail(res, Codes.ERROR, error)
  }
}

// Atualiza um documento.
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    // const options = { overwrite: true } // indica para o mongoose para atualiza o doc inteiro.
    const data = await User.updateOne({ _id: req.params.id }, req.body)
    if (data.n) { // n === 1 é pq o doc foi encontrado, caso contrário será 0
      const user = await User.findById(req.params.id)
      return ResponseSuccess(res, Codes.OK, user)
    } else {
      return ResponseFail(res, Codes.NOT_FOUND, null)
    }
  } catch (error) {
    return ResponseFail(res, Codes.ERROR, error)
  }
}

// Atualiza parcialmente um documento
export const updatePatchUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const options = { new: true } // retorna o doc com os campos atualizados.
    const user = await User.findByIdAndUpdate(req.params.id, req.body, options)
    if (user) {
      return ResponseSuccess(res, Codes.OK, user)
    } else {
      return ResponseFail(res, Codes.NOT_FOUND, null)
    }
  } catch (error) {
    return ResponseFail(res, Codes.ERROR, error)
  }
}

// Deleta um documento
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndRemove(req.params.id, req.body)
    if (user) {
      return ResponseSuccess(res, Codes.OK, user)
    } else {
      return ResponseFail(res, Codes.NOT_FOUND, null)
    }
  } catch (error) {
    return ResponseFail(res, Codes.ERROR, error)
  }
}
