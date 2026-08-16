import type { ApplicationInstance } from './application.ts'

import { TodoController } from '../app/controllers/todo.controller.tsx'

export function LoadControllers(app: ApplicationInstance) {
  app.router.route('/', new TodoController().router)
}
