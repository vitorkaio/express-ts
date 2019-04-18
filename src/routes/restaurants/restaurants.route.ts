import { Router } from 'express'
import * as restaurantController from './restaurants.controller'

const router = Router()

// GET /restaurants
router.get('/', restaurantController.getRestaurants)

// POST /restaurants
router.post('/', restaurantController.setRestaurant)

// GET /restaurants/:id
router.get('/:id', restaurantController.getRestaurantsId)

// GET /restaurants/:id/menu
router.get('/:id/menu', restaurantController.getRestaurantIdMenu)

// PUT /restaurants/:id/menu
router.put('/:id/menu', restaurantController.updateRestaurantMenu)

/*

// PUT /users
router.put('/:id', updateUser)

// PATCH /users
router.patch('/:id', updatePatchUser)

// DELETE /users
router.delete('/:id', deleteUser) */

export default router
