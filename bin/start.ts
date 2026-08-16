import { serve } from '@hono/node-server'

import { application } from '../config/application.ts'

serve(application.start(), (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
