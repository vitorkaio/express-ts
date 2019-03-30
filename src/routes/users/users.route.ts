import * as express from 'express'
import { getUsers, getUserId, setUser, updateUser, updatePatchUser, deleteUser } from './users.controller'

const router = express.Router()

// GET /users
router.get('/', getUsers)

// GET /users/:id
router.get('/:id', getUserId)

// POST /users
router.post('/', setUser)

// PUT /users
router.put('/:id', updateUser)

// PATCH /users
router.patch('/:id', updatePatchUser)

// DELETE /users
router.delete('/:id', deleteUser)

export default router
