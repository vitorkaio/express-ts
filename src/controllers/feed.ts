import { Response, Request } from 'express'

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    posts: [
      { title: 'Teste', content: 'Content Teste' },
      { title: 'Gims', content: 'Content Gims' }
    ]
  })
}

export const createPost = async (req: Request, res: Response): Promise<Response> => {
  const title = req.body.title
  const content = req.body.content
  return res.status(201).json({
    message: 'Create success!',
    post: { title: title, content: content }
  })
}

export const getDatePost = async (req: Request, res: Response): Promise<Response> => {
  const reqId = req.params.id
  return res.status(200).json({
    id: reqId,
    data: Date.now()
  })
}
