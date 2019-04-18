import { Router } from 'express'
import * as userController from './users.controller'

const router = Router()

// GET /users
router.get('/', userController.getUsers)

// GET /users/:id
router.get('/:id', userController.getUserId)

// POST /users
router.post('/', userController.setUser)

// PUT /users
router.put('/:id', userController.updateUser)

// PATCH /users
router.patch('/:id', userController.updatePatchUser)

// DELETE /users
router.delete('/:id', userController.deleteUser)

export default router
