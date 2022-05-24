import type { FastifyInstance } from 'fastify'
import {
  postSchema,
  postNotFoundSchema,
  getPostsSchema,
  getOnePostSchema,
  postPostsSchema,
  putPostsSchema,
  deletePostsSchema
} from './schema'
import {
  getPostsHandler,
  getOnePostHandler,
  postPostsHandler,
  putPostsHandler,
  deletePostsHandler
} from './handler'

export default async (fastify: FastifyInstance) => {
  fastify.addSchema(postSchema)
  fastify.addSchema(postNotFoundSchema)
  fastify.get('/', { schema: getPostsSchema }, getPostsHandler)
  fastify.get('/:postid', { schema: getOnePostSchema }, getOnePostHandler)
  fastify.post('/', { schema: postPostsSchema }, postPostsHandler)
  fastify.put('/:postid', { schema: putPostsSchema }, putPostsHandler)
  fastify.delete('/:postid', { schema: deletePostsSchema }, deletePostsHandler)
}
