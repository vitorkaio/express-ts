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
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false // o password não será inferido na query, será ocultado.
  },
  data: {
    type: Date,
    default: Date.now() // Pega a data no momento que é armazenado.
  }
})

export const User = mongoose.model<UserI>('User', userSchema)
