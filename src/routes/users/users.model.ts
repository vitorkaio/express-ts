import * as mongoose from 'mongoose'
import { hashPassword } from '../../services/aux'

export interface UserI extends mongoose.Document {
  name?: string;
  email?: string;
  password?: string;
  data?: Date;
}

// O schema defini as propriedades e os tipos delas.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // indica que o campo é obrigatório.
    maxlength: 80, // tamanho mínimo e máximo da string.
    minlength: 4
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false, // o password não será inferido na query, será ocultado.
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Masculino', 'Feminino'] // aceita apenas dois valores.
  },
  data: {
    type: Date,
    default: Date.now() // Pega a data no momento que é armazenado.
  }
})

// Utiliza middleware mongoose pra criptografar o campo password.
// Executa antes do save.
userSchema.pre('save', async function (next) {
  const user: UserI = this
  if (!user.isModified) {
    next()
  } else {
    try {
      const newPassWord = await hashPassword(user.password)
      user.password = newPassWord
      next()
    } catch (error) {
      next(error)
    }
  }
})

userSchema.pre('findOneAndUpdate', async function (next) {
  if (!this.getUpdate().password) {
    next()
  } else {
    try {
      const newPassWord = await hashPassword(this.getUpdate().password)
      this.getUpdate().password = newPassWord
      next()
    } catch (error) {
      next(error)
    }
  }
})

export const User = mongoose.model<UserI>('User', userSchema)
