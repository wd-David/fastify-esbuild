import { join } from 'path'
import Fastify from 'fastify'
import autoLoad from 'fastify-autoload'

const fastify = Fastify({
  logger: true
})

fastify.register(autoLoad, {
  dir: join(__dirname, 'plugins')
})

fastify.register(autoLoad, {
  dir: join(__dirname, 'routes')
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
