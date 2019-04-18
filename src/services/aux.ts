import { hash } from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await hash(password, 10)
  } catch (error) {
    throw new Error(error)
  }
}
