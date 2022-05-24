import { type RouteHandler } from 'fastify'
import type { Params, Querystring, Body, Reply, PostNotFound } from './schema'
import { posts } from './posts'

export const getPostsHandler: RouteHandler<{
  Querystring: Querystring
  Reply: Reply
}> = async function (req, reply) {
  const { deleted } = req.query
  if (deleted !== undefined) {
    const filteredPosts = posts.filter((post) => post.deleted === deleted)
    reply.send({ posts: filteredPosts })
  } else reply.send({ posts })
}

export const getOnePostHandler: RouteHandler<{
  Params: Params
  Reply: Reply | PostNotFound
}> = async function (req, reply) {
  const { postid } = req.params
  const post = posts.find((p) => p.id == postid)
  if (post) reply.send({ posts: [post] })
  else reply.code(404).send({ error: 'Post not found' })
}

export const postPostsHandler: RouteHandler<{
  Body: Body
  Reply: Body
}> = async function (req, reply) {
  const newPostID = posts.length + 1
  const newPost = {
    id: newPostID,
    ...req.body
  }
  posts.push(newPost)
  console.log(posts)
  reply.code(201).header('Location', `/posts/${newPostID}`).send(newPost)
}

export const putPostsHandler: RouteHandler<{
  Params: Params
  Body: Body
  Reply: PostNotFound
}> = async function (req, reply) {
  const { postid } = req.params
  const post = posts.find((p) => p.id == postid)
  if (post) {
    post.title = req.body.title
    post.content = req.body.content
    post.tags = req.body.tags
    reply.code(204)
  } else {
    reply.code(404).send({ error: 'Post not found' })
  }
}

export const deletePostsHandler: RouteHandler<{
  Params: Params
  Reply: PostNotFound
}> = async function (req, reply) {
  const { postid } = req.params
  const post = posts.find((p) => p.id == postid)
  if (post) {
    post.deleted = true
    reply.code(204)
  } else {
    reply.code(404).send({ error: 'Post not found' })
  }
}
