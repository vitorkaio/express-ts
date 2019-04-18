import { Router } from 'express'
import * as reviewsController from './reviews.controller'

const router = Router()

// GET /reviews
router.get('/', reviewsController.getReviews)

// POST /reviews
router.post('/', reviewsController.setReview)

// GET /reviews/:id
router.get('/:id', reviewsController.getReviewId)

/*

// GET /restaurants/:id/menu
router.get('/:id/menu', restaurantController.getRestaurantIdMenu)

// PUT /restaurants/:id/menu
router.put('/:id/menu', restaurantController.updateRestaurantMenu) */

export default router
