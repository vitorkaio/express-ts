import * as mongoose from 'mongoose'

export interface UserI extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  data: Date;
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
    required: false,
    enum: ['Masculino', 'Feminino'] // aceita apenas dois valores.
  },
  data: {
    type: Date,
    default: Date.now() // Pega a data no momento que é armazenado.
  }
})

export const User = mongoose.model<UserI>('User', userSchema)
