import 'dotenv/config'

import { Hono } from 'hono'

import { LoadControllers } from './routes.ts'

class Application {
  router: Hono

  constructor() {
    this.router = new Hono()
    LoadControllers(this)
  }

  start() {
    process.on('SIGINT', () => {
      console.log('\nReceived SIGINT. Shutting down...')
      process.exit(0)
    })

    process.on('SIGTERM', () => {
      console.log('\nReceived SIGTERM. Shutting down...')
      process.exit(0)
    })

    return {
      fetch: this.router.fetch,
      hostname: 'localhost',
      port: 3000
    }
  }
}

export type ApplicationInstance = InstanceType<typeof Application>
export const application = new Application()
