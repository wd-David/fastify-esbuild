import type { FastifyPluginAsync } from 'fastify'

const badRequest: FastifyPluginAsync = async (fastify): Promise<void> => {
  // Note: using an arrow function will break the binding of this to the FastifyInstance.
  fastify.get('/', async function (req, reply) {
    reply.badRequest()
  })
}

export default badRequest
