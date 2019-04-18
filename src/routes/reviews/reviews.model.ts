import { Document, Schema, Types, model } from 'mongoose'
import { RestaurantI } from '../restaurants/restaurants.model'
import { UserI } from '../users/users.model'

export interface ReviewsI extends Document {
  date?: Date;
  rating?: number;
  comments?: string;
  restaurant?: Types.ObjectId | RestaurantI; // Popula a props com os dados da ref
  user?: Types.ObjectId | UserI;
}

const reviewSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant', // Ref ao doc restaurant
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export const Reviews = model<ReviewsI>('Reviews', reviewSchema)
