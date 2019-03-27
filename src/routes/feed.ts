import * as express from 'express'
import { getPosts, createPost, getDatePost } from './../controllers/feed'

const router = express.Router()

// GET /feed/posts
router.get('/posts', getPosts)

// Cria um post
router.post('/post', createPost)

// Pegao o id
router.get('/posts/:id', getDatePost)

export default router
