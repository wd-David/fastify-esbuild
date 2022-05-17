import { FastifySchema } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

// Shared Schema
export const postSchema = {
  $id: 'post',
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    published: { type: 'boolean' },
    content: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    deleted: { type: 'boolean' }
  },
  required: ['title', 'published', 'content', 'tags', 'deleted']
} as const

// Not found Schema
export const postNotFoundSchema = {
  $id: 'postNotFound',
  type: 'object',
  required: ['error'],
  properties: {
    error: { type: 'string' }
  },
  additionalProperties: false
} as const

export type NotFoundResponse = FromSchema<typeof postNotFoundSchema>

// Params Schema
const postsParamsSchema = {
  type: 'object',
  require: ['postid'],
  properties: {
    postid: { type: 'number' }
  },
  additionalProperties: false
} as const

export type PostsParams = FromSchema<typeof postsParamsSchema>

// Query Schema
const postsQuerySchema = {
  type: 'object',
  properties: {
    deleted: { type: 'boolean' }
  },
  additionalProperties: false
} as const

export type PostsQuery = FromSchema<typeof postsQuerySchema>

// Body Schema
export type PostsBody = FromSchema<typeof postSchema>

// Response Schema
const getPostsResponseSchema = {
  type: 'object',
  properties: {
    posts: {
      type: 'array',
      items: { $ref: 'post#' }
    }
  },
  additionalProperties: false
} as const

export type GetPostsResponse = FromSchema<
  typeof getPostsResponseSchema,
  { references: [typeof postSchema] }
>

/* Get */
export const getPostsSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Get posts',
  querystring: postsQuerySchema,
  response: {
    200: {
      ...getPostsResponseSchema
    }
  }
}

export const getOnePostSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Get a post by id',
  params: postsParamsSchema,
  response: {
    200: {
      ...getPostsResponseSchema
    },
    404: {
      description: 'The post was not found',
      $ref: 'postNotFound#'
    }
  }
}

/* Post */
export const postPostsSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Create a new post',
  body: postSchema,
  response: {
    201: {
      description: 'The post was created',
      headers: {
        Location: {
          type: 'string',
          description: 'URL of the new resource'
        }
      },
      type: 'object'
    }
  }
}

/* Put */
export const putPostsSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Update a post',
  params: postsParamsSchema,
  body: postSchema,
  response: {
    204: {
      description: 'The post was updated',
      type: 'null'
    },
    404: {
      description: 'The post was not found',
      $ref: 'postNotFound#'
    }
  }
}

/* Delete */
export const deletePostsSchema: FastifySchema = {
  tags: ['Posts'],
  description: 'Delete a post',
  params: postsParamsSchema,
  response: {
    204: {
      description: 'The post was deleted',
      type: 'null'
    },
    404: {
      description: 'The post was not found',
      $ref: 'postNotFound#'
    }
  }
}
