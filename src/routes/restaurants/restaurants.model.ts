import { Document, Schema, model } from 'mongoose'

export interface MenuItemI extends Document {
  name?: string;
  price?: number;
}

export interface RestaurantI extends Document {
  name?: string;
  menu?: MenuItemI[];
}

const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const restSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  menu: {
    type: [menuSchema],
    required: false,
    select: false, // não traz o sub-doc de menu nas querys.
    default: [] // inicia o array com uma lista vazia.
  }
})

export const Restaurant = model<RestaurantI>('Restaurant', restSchema)
