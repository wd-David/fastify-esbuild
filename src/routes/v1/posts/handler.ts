import { type RouteHandler } from 'fastify'
import {
  type PostsParams,
  type PostsQuery,
  type PostsBody,
  type GetPostsResponse,
  type NotFoundResponse
} from './schema'
import { posts } from './posts'

export const getAllPostsHandler: RouteHandler<{
  Querystring: PostsQuery
  Reply: GetPostsResponse
}> = async function (req, reply) {
  if (req.query?.deleted !== undefined) {
    const { deleted } = req.query
    const filteredPosts = posts.filter((post) => post.deleted === deleted)
    reply.send({ posts: filteredPosts })
  } else reply.send({ posts })
}

export const getPostsHandler: RouteHandler<{
  Params: PostsParams
  Reply: GetPostsResponse | NotFoundResponse
}> = async function (req, reply) {
  const { postid } = req.params
  const post = posts.find((p) => p.id == postid)
  if (post) reply.send({ posts: [post] })
  else reply.code(404).send({ error: 'Post not found' })
}

export const postPostsHandler: RouteHandler<{
  Body: PostsBody
}> = async function (req, reply) {
  const newPostID = posts.length + 1
  posts.push({
    id: newPostID,
    ...req.body
  })
  console.log(posts)
  reply.code(201).header('Location', `/posts/${newPostID}`).send({})
}

export const putPostsHandler: RouteHandler<{
  Params: PostsParams
  Body: PostsBody
  Reply: Record<string, never> | NotFoundResponse
}> = async function (req, reply) {
  const { postid } = req.params
  const post = posts.find((p) => p.id == postid)
  if (post) {
    post.title = req.body.title
    post.content = req.body.content
    post.tags = req.body.tags
    reply.code(204).send({})
  } else {
    reply.code(404).send({ error: 'Post not found' })
  }
}

export const deletePostsHandler: RouteHandler<{
  Params: PostsParams
  Reply: Record<string, never> | NotFoundResponse
}> = async function (req, reply) {
  const { postid } = req.params
  const post = posts.find((p) => p.id == postid)
  if (post) {
    post.deleted = true
    reply.code(204).send({})
  } else {
    reply.code(404).send({ error: 'Post not found' })
  }
}
