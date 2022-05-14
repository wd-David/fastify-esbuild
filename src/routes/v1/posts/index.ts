import { FastifyPluginAsync } from 'fastify'
import {
  postSchema,
  postNotFoundSchema,
  getPostsSchema,
  postPostsSchema,
  putPostsSchema,
  deletePostsSchema
} from './schema'
import {
  getAllPostsHandler,
  getPostsHandler,
  postPostsHandler,
  putPostsHandler,
  deletePostsHandler
} from './handler'

const posts: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.addSchema(postSchema)
  fastify.addSchema(postNotFoundSchema)
  fastify.get('/', { schema: getPostsSchema }, getAllPostsHandler)
  fastify.get('/:postid', { schema: getPostsSchema }, getPostsHandler)
  fastify.post('/', { schema: postPostsSchema }, postPostsHandler)
  fastify.put('/:postid', { schema: putPostsSchema }, putPostsHandler)
  fastify.delete('/:postid', { schema: deletePostsSchema }, deletePostsHandler)
}

export default posts
